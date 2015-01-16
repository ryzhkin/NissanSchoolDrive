/****************************************************************************
 Copyright (c) 2010-2011 cocos2d-x.org
 Copyright (c) 2010      Ricardo Quesada
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#import "RootViewController.h"
#import "cocos2d.h"
#import "platform/ios/CCEAGLView-ios.h"



@implementation RootViewController

+(void)openLinkWithUrl:(NSString *)url {
  //[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"http://www.ya.ru"]];
    NSURL* url2 = [NSURL URLWithString:url];
    std::string *url3 = new std::string([url UTF8String]);
    cocos2d::Application::getInstance()->openURL(*url3);
   
}



+(void)openVideoWithUrl:(NSString *)url {
    
    NSURL *movieURL = [NSURL URLWithString:url];
    //MPMoviePlayerController *theMoviPlayer = [[[MPMoviePlayerController alloc] initWithContentURL:movieURL] autorelease];
    MPMoviePlayerController *theMoviPlayer = [[MPMoviePlayerController alloc] initWithContentURL:movieURL];
    
    
    // Register this class as an observer instead
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(movieFinishedCallback:)
                                                 name:MPMoviePlayerPlaybackStateDidChangeNotification
                                               object:theMoviPlayer];
    
    
    theMoviPlayer.controlStyle = MPMovieControlStyleFullscreen;
    theMoviPlayer.shouldAutoplay=YES;
    theMoviPlayer.view.transform = CGAffineTransformConcat(theMoviPlayer.view.transform, CGAffineTransformMakeRotation(M_PI_2));
    UIWindow *backgroundWindow = [[UIApplication sharedApplication] keyWindow];
    
    [theMoviPlayer.view setFrame:backgroundWindow.frame];
    [backgroundWindow addSubview:theMoviPlayer.view];
    [theMoviPlayer play];
}


+ (void)movieFinishedCallback:(NSNotification*)aNotification
{
    
     MPMoviePlayerController *player = [aNotification object];
    if (/*player.playbackState == MPMoviePlaybackStatePaused ||*/
           player.playbackState ==   MPMoviePlaybackStateStopped
        /*
        && player.playbackState != MPMoviePlaybackStateSeekingForward
        && player.playbackState != MPMoviePlaybackStateSeekingBackward
         */
        ) {
        [player.view removeFromSuperview];
        [player release];
        player = nil;
        
        [[NSNotificationCenter defaultCenter] removeObserver:self
                                                        name:MPMoviePlayerPlaybackStateDidChangeNotification
                                                      object:nil];
        
        
    }
   
   
}

+ (void)movieFinishedCallback2:(NSNotification*)aNotification
{
    
    MPMoviePlayerController *player = [aNotification object];
    
        [player.view removeFromSuperview];
        [player release];
        player = nil;
        
        [[NSNotificationCenter defaultCenter] removeObserver:self
                                                        name:MPMoviePlayerDidExitFullscreenNotification
                                                      object:nil];
        
        
   
    
    
}



/*
+(void) removeVideo {
    if (player.playbackState == MPMoviePlaybackStatePaused || player.playbackState ==   MPMoviePlaybackStateStopped) {
        [player.view removeFromSuperview];
        [player release];
        player = nil;
        
        [[NSNotificationCenter defaultCenter] removeObserver:self
                                                        name:MPMoviePlayerPlaybackStateDidChangeNotification
                                                      object:nil];
        
        AudioManager::sharedManager()->playBG();
    }
}
//*/


/*
 // The designated initializer.  Override if you create the controller programmatically and want to perform customization that is not appropriate for viewDidLoad.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    if ((self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil])) {
        // Custom initialization
    }
    return self;
}
*/

/*
// Implement loadView to create a view hierarchy programmatically, without using a nib.
- (void)loadView {
}
*/

/*
// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
}
 
*/
// Override to allow orientations other than the default portrait orientation.
// This method is deprecated on ios6
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return UIInterfaceOrientationIsLandscape( interfaceOrientation );
}

// For ios6, use supportedInterfaceOrientations & shouldAutorotate instead
- (NSUInteger) supportedInterfaceOrientations{
#ifdef __IPHONE_6_0
    return UIInterfaceOrientationMaskAllButUpsideDown;
#endif
}

- (BOOL) shouldAutorotate {
    return YES;
}

- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation {
    [super didRotateFromInterfaceOrientation:fromInterfaceOrientation];

    cocos2d::GLView *glview = cocos2d::Director::getInstance()->getOpenGLView();
    if (glview)
    {
        cocos2d::CCEGLView *eaglview = (cocos2d::CCEGLView*) glview->getEAGLView();
        
        if (eaglview)
        {
            CGSize s = CGSizeMake([eaglview getWidth], [eaglview getHeight]);
            cocos2d::Application::getInstance()->applicationScreenSizeChanged((int) s.width, (int) s.height);
        }
    }
}

//fix not hide status on ios7
- (BOOL)prefersStatusBarHidden
{
    return YES;
}

- (void)didReceiveMemoryWarning {
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

- (void)viewDidUnload {
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}


- (void)dealloc {
    [super dealloc];
}


@end
