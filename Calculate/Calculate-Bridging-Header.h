//
//  Calculate-Bridging-Header.h
//  Calculate
//
//  Created by David Brackeen on 2/16/23.
//  Copyright © 2023 David Brackeen. All rights reserved.
//

#ifndef Calculate_Bridging_Header_h
#define Calculate_Bridging_Header_h

#include <JavaScriptCore/JavaScriptCore.h>

// Private functions for JSContextGroupRef to set execution time limit

typedef bool (*JSShouldTerminateCallback)(JSContextRef ctx, void *context);

JS_EXPORT void JSContextGroupSetExecutionTimeLimit(JSContextGroupRef group, double limit,
                                                   JSShouldTerminateCallback callback,
                                                   void *context);

JS_EXPORT void JSContextGroupClearExecutionTimeLimit(JSContextGroupRef group);

#endif
