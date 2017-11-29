/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <ViroReact/VRTBundleURLProvider.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  BOOL enterVrImmediately = YES;
  BOOL usingNgrok = YES;

  if(enterVrImmediately) {
    NSURL *jsCodeLocation = nil;
#ifdef DEBUG
    if(usingNgrok) {
      VRTBundleURLProvider *bundleProvider = [[VRTBundleURLProvider alloc] init];
      // jsCodeLocation = [bundleProvider jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
      jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    }
#endif
    if(jsCodeLocation == nil) {
      jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    }

    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"morningmonster"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:0.97 green:0.30 blue:0.51 alpha:1];
    // rootView.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"bg-pink--gradient.png"]];
    // rootView.backgroundColor = [UIColor clearColor];

    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
  }
  return YES;
}

@end
