import Cocoa

/*
 A vertical list collection view.
 Assumptions:
 - Only one section.
 - Items can have different heights.
 - Most items fit in the minimum width.
 - Items only change in height when the width of the NSCollectionView changes.
 - Items only grow in height when the width shrinks. (Height of items is inverse to the width of the NSCollectionView.)
 - Item deletions always happen at the beginning of the list.
 */
class VerticalListCollectionViewLayout: NSCollectionViewFlowLayout {
    
    var bottomAligned = false {
        didSet {
            invalidateLayout()
        }
    }
    
    // Caching measured item heights improves performance when resizing the window,
    // but may not be the best solution. A better solution would be using a NSCollectionView that
    // doesn't need to know the size of *every* item (for collectionViewContentSize).
    fileprivate struct MeasuredItem {
        let height: CGFloat
        var minKnownWidth: CGFloat
        var maxKnownWidth: CGFloat
    }
    
    fileprivate var measuredItems: [MeasuredItem] = []
    
    func notifyReloadData() {
        measuredItems = []
    }
    
    func notifyDeleteFirst(_ count: Int) {
        if count >= measuredItems.count {
            measuredItems = []
        } else {
            measuredItems.removeFirst(count)
        }
    }
    
    fileprivate func fillInItems(forIndexPath indexPath: IndexPath) {
        if indexPath.item >= measuredItems.count {
            let count = indexPath.item - measuredItems.count + 1
            let measuredItem = MeasuredItem(height: 0, minKnownWidth: 0, maxKnownWidth: 0)
            measuredItems.append(contentsOf: Array(repeating: measuredItem, count: count))
        }
    }
    
    override func invalidationContext(forBoundsChange newBounds: NSRect) -> NSCollectionViewLayoutInvalidationContext {
        return NSCollectionViewFlowLayoutInvalidationContext()
    }
    
    override func shouldInvalidateLayout(forBoundsChange newBounds: NSRect) -> Bool {
        if itemSize.width != newBounds.width {
            itemSize.width = newBounds.width
            return true
        } else if bottomAligned && newBounds.height > collectionViewContentSize.height {
            return true
        } else {
            return false
        }
    }
    
    override func layoutAttributesForElements(in rect: CGRect) -> [NSCollectionViewLayoutAttributes] {
        let attributes = super.layoutAttributesForElements(in: rect)
        guard bottomAligned, let collectionView = collectionView, collectionView.bounds.height > collectionViewContentSize.height else {
            return attributes
        }
        
        var offsetY: CGFloat = 0
        if let clipView = collectionView.superview as? NSClipView, clipView.documentRect.height == clipView.documentVisibleRect.height {
            // This is required when the user launches with the default window
            offsetY = clipView.documentVisibleRect.minY
        }
        
        let offset = collectionView.bounds.height - collectionViewContentSize.height + offsetY
        return attributes.map { attribute in
            let newAttribute = attribute.copy() as! NSCollectionViewLayoutAttributes
            newAttribute.frame.origin.y += offset
            return newAttribute
        }
    }
}

protocol VerticalListCollectionViewDelegateLayout: NSCollectionViewDelegateFlowLayout {
    
    func minimumWidth() -> CGFloat
    
    func minimumHeight(forItemAt indexPath: IndexPath) -> CGFloat
    
    func measuredHeight(forItemAt indexPath: IndexPath, width: CGFloat) -> CGFloat
    
}

extension VerticalListCollectionViewDelegateLayout {
    
    // Default height for items that are not visible. For now, just use minimumHeight
    private func defaultHeight(forItemAt indexPath: IndexPath) -> CGFloat {
        return minimumHeight(forItemAt: indexPath)
    }
    
    func itemSize(forWidth collectionViewWidth: CGFloat, layout collectionViewLayout: NSCollectionViewLayout, indexPath: IndexPath) -> CGSize {
        guard let layout = collectionViewLayout as? VerticalListCollectionViewLayout else {
            return CGSize(width: collectionViewWidth, height: defaultHeight(forItemAt: indexPath))
        }
        
        layout.fillInItems(forIndexPath: indexPath)
        
        var measuredItem = layout.measuredItems[indexPath.item]
        if collectionViewWidth >= measuredItem.minKnownWidth && collectionViewWidth <= measuredItem.maxKnownWidth {
            return CGSize(width: collectionViewWidth, height: measuredItem.height)
        }
        
        let collectionViewMinWidth = minimumWidth()
        if measuredItem.height <= 0 && collectionViewMinWidth > 0 {
            // First measure. See if it fits in the minimum width
            let maximumItemHeight = measuredHeight(forItemAt: indexPath, width: collectionViewMinWidth)
            if maximumItemHeight == minimumHeight(forItemAt: indexPath) {
                layout.measuredItems[indexPath.item] = VerticalListCollectionViewLayout.MeasuredItem(height: maximumItemHeight, minKnownWidth: collectionViewMinWidth, maxKnownWidth: .greatestFiniteMagnitude)
                return CGSize(width: collectionViewWidth, height: maximumItemHeight)
            }
        }

        let itemHeight = measuredHeight(forItemAt: indexPath, width: collectionViewWidth)
        if itemHeight == measuredItem.height {
            if measuredItem.minKnownWidth > collectionViewWidth {
                measuredItem.minKnownWidth = collectionViewWidth
            }
            if measuredItem.maxKnownWidth < collectionViewWidth {
                measuredItem.maxKnownWidth = collectionViewWidth
            }
        } else {
            measuredItem = VerticalListCollectionViewLayout.MeasuredItem(height: itemHeight, minKnownWidth: collectionViewWidth, maxKnownWidth: collectionViewWidth)
        }
        if itemHeight <= minimumHeight(forItemAt: indexPath) {
            measuredItem.maxKnownWidth = .greatestFiniteMagnitude
        }
        layout.measuredItems[indexPath.item] = measuredItem
        return CGSize(width: collectionViewWidth, height: itemHeight)
    }
}
