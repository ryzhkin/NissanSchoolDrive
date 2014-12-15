var assets = {
  loaderBack       : 'res/loader/loader-background.jpg',
  loaderProgress   : 'res/loader/loader-progress.png',
  menuBack         : 'res/menu/menu-background.jpg',
  menuVideoBack    : 'res/menu/menu-video.png',
  menuLessonsBack  : 'res/menu/menu-lessons.png',
  menuGamesBack    : 'res/menu/menu-games.png',
  menuSiteBack     : 'res/menu/menu-site.png',
  videoBack        : 'res/video/video-background.jpg',
  
  // Графические ресурсы к уроку Управление газом
  acceleratorIntroBack   : 'res/accelerator/accelerator-intro-background.jpg',
  acceleratorGameBack    : 'res/accelerator/accelerator-game-background.jpg',
  acceleratorHelpBack    : 'res/accelerator/accelerator-help-background.jpg',
  acceleratorGreenLight  : 'res/accelerator/accelerator-green-light.png',
  acceleratorRedLight    : 'res/accelerator/accelerator-red-light.png',
  acceleratorYellowLight : 'res/accelerator/accelerator-yellow-light.png',
  acceleratorArrowTah    : 'res/accelerator/accelerator-arrow.png',
  acceleratorArrowSpeed  : 'res/accelerator/accelerator-arrow2.png',
  acceleratorPedal       : 'res/accelerator/accelerator-pedal.png',
  acceleratorResult      : 'res/accelerator/accelerator-result.jpg',
  
  // Графические ресурсы к уроку Прохождение поворота
  turnIntroBack: 'res/turn/turn-intro-background.jpg',
  turnChooseBack: 'res/turn/turn-choose-background.jpg',
  turnType1: 'res/turn/turn-type1.jpg',
  turnType2: 'res/turn/turn-type2.jpg',
  turnType3: 'res/turn/turn-type3.jpg',
  turnHelp: 'res/turn/turn-help.jpg',
  turnResult: 'res/turn/turn-result.jpg',
  
  
  //Графические ресурсы к уроку Прохождение связки поворотов
  rollIntroBack : 'res/roll/roll-intro.jpg',
  rollGameBack  : 'res/roll/roll-game.jpg',
  
  
  
  //Графические ресурсы к уроку Управляемый занос
  slalomIntroBack : 'res/slalom/slalom-intro.jpg',
  slalomGameBack  : 'res/slalom/slalom-game.jpg',
  
  
  // Спрайт машинки
  car: 'res/car.png',
  
  // Графические ресурсы к теории
  theoryAcceleratorBack : 'res/theory/accelerator-bg.jpg',
  theoryTurnBack        : 'res/theory/turn-bg.jpg',
  theoryRollBack        : 'res/theory/turn-bg.jpg',
  theorySlalomBack      : 'res/theory/slalom-bg.jpg'
};

var g_assets = [
  'res/video/video-splash.jpg',
  'res/video/video-start.png'
];
for (var i in assets) {
  g_assets.push(assets[i]);
}