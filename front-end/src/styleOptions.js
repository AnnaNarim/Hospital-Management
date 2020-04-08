const borderColor = '#edf0f2';
const leftSideItemWidth = 270;
const fontSize = 12;
const distance = 15;
const height = 22;
const tabListHeight = 60;
const header = 63;
const horizontalMenuHeight = header;
const backButtonHeight = 55;
const appDocMenuWidth = 260;
const smallContainer = 450;
const createSnapLeftMenuWidth = 250;
const createSnapLeftMenuItemHeight = 45;

const width = 100;
const fullHeight = 100;

export const styleOptions = {
  fullWidth: `${width}%`,
  fontSizeSmall: fontSize - 2 ,
  fontSize,
  fontSizeDefault: fontSize + 2 ,
  fontSizeTitle: fontSize + 4 ,
  fontSizeHeader: fontSize + 6 ,
  borderColor,
  borderDefault: `1px solid ${borderColor}`,
  borderOrange: '3px solid #D9822B',

  padding: distance,
  margin: distance,

  borderRadius: 3,

  height,
  searchHeight: height*2,

  logoHeight: 40,

  horizontalMenuHeight,

  backButtonHeight,

  smallContainer,

  minSignupHeight: 357,

  tabHeight: 35,
  tabWidth: width,
  tabListHeight,
  tabContentHeight: `calc(${fullHeight}vh - ${header}px - ${tabListHeight}px)`,
  tabContentWithButtonHeight: `calc(${fullHeight}vh - ${horizontalMenuHeight}px - ${tabListHeight}px - ${backButtonHeight}px)`,

  breadCrumb: header,
  breadCrumbContentHeight: `calc(${fullHeight}vh - ${header}px)`,

  containersHeight: `calc(${fullHeight}vh - ${header}px - ${backButtonHeight}px)`,
  leftSideListContentHeight: `calc(${fullHeight}vh - ${header}px)`,

  snapshotLoaderHeight: 200,
  statsContainerHeight: fullHeight,
  killContainerHeight: fullHeight,
  containerHeight: 150,

  buildLoaderContainerHeight: 25,
  buildLoaderContainerWidth: `${width/10}%`,
  buildLoaderHeight: 25,
  buildLoaderWidth: 25,

  badgeWidth: 80,
  titleWidth: "80%",

  comboboxWidth: 240,

  appDocMenuWidth,
  appDocBodyWidth: `calc(${width}% - ${appDocMenuWidth}px)`,

  leftSideItemWidth,
  componentWidth: `calc(${width}% - ${leftSideItemWidth}px)`,

  signupTabListHeight: 323,
  signupTabHeight: fullHeight+1,
  signupTabWidth: 327,

  welcomeWidth: 600,
  welcomeHeight: 400,
  welcomeLogoWidth: 60,
  welcomeLogoHeight: 80,
  logoWidthMobile: 50,
  logoHeightMobile: 60,
  welcomeContentHeight: `calc(${fullHeight}vh - 120px)`,
  welcomeContentWidth: `calc(${width}% - 30px)`,
  welcomeContentHeightMobile: `calc(${fullHeight}% - ${header}px - 120px)`,

  sourcesCardMinWidth: 210,
  sourcesCardMaxWidth: 230,
  sourcesCardHeight: 240,
  sourcesLoaderHeight: 100,

  segmentedControlItemWidth: 88,

  createSnapLeftMenuWidth,
  createSnapLeftMenuContentWidth: `calc(${width}% - ${createSnapLeftMenuWidth}px)`,
  createSnapLeftMenuContentHeight: `calc(${fullHeight}vh - ${createSnapLeftMenuItemHeight}px - ${backButtonHeight}px - ${header}px)`,
  createSnapLeftMenuItemHeight,
  inputWidth: '60%',
  createSnapLeftMenuTabWidth: `${width/3}%`,

  colors: {
    primary: '#163C7D',
    selected: '#1B4896',

    defaultText: "#515f7f",
    orange: '#EE9913',
    chambray: '#425A70',
    secondary: 'rgba(66,90,112,0.5)',
    button: 'rgba(81,95,127,0.1)',
    dark: '#242424',
    sirocco: '#7a7e7e',
    iron: '#d2d8d8',
    bahamaBlue: '#016699',
    geyser: '#d5dee6',
    selectedBackground: '#f5f6f7',
    selectedBlue: 'rgb(221, 235, 247, 0.6)',
    defaultBackground: 'white',
    background: '#F7F8FA',
    disabled: '#edf0f2',
    disabledText: 'rgba(67, 90, 111)'
  },
  mediaQuery: {
    large: 1200,
    smallBreadCrumb: 950,
    small: 768,
    extraSmall: 677
  }
}