import React from 'react';
import {SvgXml} from 'react-native-svg';

const WelcomeIcon = () => {
  const svgMarkup = `<svg width="127" height="189" viewBox="0 0 2006 3141" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0)">
  <path d="M1894.64 94.4358C1768.66 -31.4786 1563.74 -31.4786 1437.76 94.4358L143.364 1388.83C142.754 1389.44 142.395 1390.19 141.857 1390.84C141.103 1391.7 140.457 1392.63 139.775 1393.57C137.873 1396.22 136.401 1399.06 135.288 1402.14C134.965 1403.08 134.499 1403.9 134.248 1404.84C134.14 1405.2 133.924 1405.55 133.817 1405.91L6.93323 1938.93C6.35894 1941.34 6.21536 1943.78 6.14357 1946.18C6.14357 1946.65 6 1947.08 6 1947.55C6.03589 1951.64 6.93323 1955.62 8.33308 1959.46C8.65612 1960.36 9.01505 1961.15 9.40988 1962.01C11.1687 1965.85 13.3582 1969.55 16.445 1972.64C19.8549 1976.05 23.875 1978.67 28.2181 1980.46C32.5612 1982.26 37.1915 1983.15 41.8217 1983.15C44.5855 1983.15 47.3852 1982.83 50.1131 1982.18L583.132 1855.3C584.101 1855.08 584.962 1854.55 585.896 1854.22C587.116 1853.83 588.265 1853.36 589.449 1852.82C592.033 1851.64 594.438 1850.17 596.664 1848.41C597.525 1847.73 598.422 1847.22 599.248 1846.47C599.535 1846.18 599.894 1846.04 600.181 1845.75L1894.61 551.324C2020.6 425.338 2020.6 220.386 1894.64 94.4358ZM1843.89 145.189C1933.19 234.528 1940.8 374.8 1867.22 473.148L1515.93 121.858C1614.32 48.2768 1754.59 55.8862 1843.89 145.189ZM1666.22 678.208L1310.87 322.862L1361.63 272.109L1716.97 627.455L1666.22 678.208ZM184.068 1805.01C170.033 1790.98 147.349 1790.98 133.314 1805.01L106.143 1832.18L197.815 1447.12L356.536 1429.49L336.113 1613.34C335.969 1614.71 336.472 1615.96 336.472 1617.29C336.472 1618.65 335.969 1619.87 336.113 1621.24C336.256 1622.42 336.866 1623.39 337.118 1624.54C337.548 1626.62 338.159 1628.52 338.912 1630.46C339.846 1632.8 340.958 1634.91 342.322 1636.96C343.435 1638.61 344.548 1640.08 345.912 1641.52C347.634 1643.35 349.501 1644.89 351.547 1646.33C353.162 1647.44 354.705 1648.48 356.5 1649.34C358.869 1650.46 361.346 1651.1 363.93 1651.71C365.294 1652.03 366.407 1652.79 367.807 1652.97C369.099 1653.11 370.391 1653.18 371.719 1653.18H371.755H371.791H371.827H371.863C373.155 1653.18 374.483 1653.11 375.775 1652.97L559.622 1632.54L541.998 1791.27L156.896 1882.94L184.068 1855.77C198.066 1841.77 198.066 1819.05 184.068 1805.01ZM634.531 1608.35L1437.76 805.091C1451.79 791.057 1451.79 768.372 1437.76 754.338C1423.72 740.304 1401.04 740.304 1387 754.338L583.778 1557.6L412.458 1576.62L431.482 1405.3L1234.78 602.078C1248.81 588.043 1248.81 565.359 1234.78 551.324C1220.74 537.29 1198.06 537.29 1184.03 551.324L380.728 1354.55L266.479 1367.26L1260.12 373.616L1615.47 728.961L621.825 1722.6L634.531 1608.35ZM1767.73 576.701L1412.38 221.355L1463.17 170.566L1818.51 525.912L1767.73 576.701Z" fill="black"/>
  </g>
  <path d="M362.961 2121.93L1992.26 2119.69" stroke="black" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 2121.93H204.312" stroke="black" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M552.668 2489.03C558.268 2500.7 561.534 2512.6 562.468 2524.73C563.401 2536.4 563.868 2548.53 563.868 2561.13V2787.93H526.768V2539.43C526.768 2515.63 520.468 2497.43 507.868 2484.83C495.268 2472.23 481.034 2465.93 465.168 2465.93C456.301 2465.93 444.868 2467.33 430.868 2470.13C417.334 2472.93 401.934 2479.93 384.668 2491.13V2787.93H348.968V2472.23L333.568 2457.53L358.768 2432.33L379.768 2453.33C405.434 2438.87 429.701 2431.63 452.568 2431.63C473.568 2431.63 493.168 2436.07 511.368 2444.93C529.568 2453.33 543.334 2468.03 552.668 2489.03ZM690.316 2962.93L719.016 2787.93H714.116L621.016 2437.93H656.716C668.85 2489.27 679.583 2532.9 688.916 2568.83C698.716 2604.3 706.883 2633.47 713.416 2656.33C720.883 2682.93 727.183 2704.87 732.316 2722.13H740.716C744.916 2704.87 750.516 2682.93 757.516 2656.33C763.583 2633.47 771.283 2604.3 780.616 2568.83C790.416 2532.9 802.55 2489.27 817.016 2437.93H852.716L758.916 2787.93H754.716L726.016 2962.93H690.316ZM1073.92 2617.83C1073.92 2617.37 1071.82 2615.97 1067.62 2613.63C1063.42 2610.83 1057.58 2608.03 1050.12 2605.23C1043.12 2601.97 1034.72 2599.17 1024.92 2596.83C1015.12 2594.03 1004.85 2592.63 994.116 2592.63C986.183 2592.63 978.483 2594.27 971.016 2597.53C964.016 2600.8 957.95 2605.23 952.816 2610.83C947.683 2616.43 943.483 2622.97 940.216 2630.43C937.416 2637.43 936.016 2645.13 936.016 2653.53V2697.63C936.016 2706.03 937.416 2713.97 940.216 2721.43C943.483 2728.43 947.683 2734.73 952.816 2740.33C957.95 2745.47 964.016 2749.67 971.016 2752.93C978.016 2756.2 985.483 2757.83 993.416 2757.83C1000.42 2757.83 1008.35 2756.67 1017.22 2754.33C1026.55 2751.53 1035.42 2748.5 1043.82 2745.23C1053.62 2741.5 1063.65 2737.3 1073.92 2732.63V2617.83ZM1109.62 2753.63L1122.92 2766.23L1097.72 2791.43L1078.82 2772.53C1063.88 2780.93 1048.25 2786.77 1031.92 2790.03C1016.05 2793.3 1003.45 2794.93 994.116 2794.93C981.05 2794.93 968.683 2792.37 957.016 2787.23C945.816 2781.63 936.016 2774.4 927.616 2765.53C919.216 2756.2 912.683 2745.47 908.016 2733.33C903.35 2721.2 901.016 2708.37 901.016 2694.83V2655.63C901.016 2642.1 903.35 2629.5 908.016 2617.83C912.683 2605.7 919.216 2595.2 927.616 2586.33C936.016 2577.47 945.816 2570.47 957.016 2565.33C968.683 2560.2 981.05 2557.63 994.116 2557.63C997.383 2557.63 1002.28 2557.87 1008.82 2558.33C1015.82 2558.8 1023.05 2559.73 1030.52 2561.13C1038.45 2562.53 1046.38 2564.63 1054.32 2567.43C1062.25 2569.77 1069.02 2573.03 1074.62 2577.23V2553.43C1074.62 2542.7 1072.52 2532.2 1068.32 2521.93C1064.58 2511.2 1059.45 2501.63 1052.92 2493.23C1046.38 2484.83 1038.68 2478.07 1029.82 2472.93C1020.95 2467.8 1011.38 2465.23 1001.12 2465.23C997.383 2465.23 990.616 2466.4 980.816 2468.73C971.483 2471.07 961.683 2473.4 951.416 2475.73C939.283 2478.53 926.216 2481.8 912.216 2485.53L902.416 2452.63C917.816 2448.9 932.05 2445.4 945.116 2442.13C956.316 2439.33 967.283 2436.77 978.016 2434.43C988.75 2432.1 996.45 2430.93 1001.12 2430.93C1016.05 2430.93 1030.05 2434.43 1043.12 2441.43C1056.18 2448.43 1067.62 2457.77 1077.42 2469.43C1087.22 2480.63 1094.92 2493.7 1100.52 2508.63C1106.12 2523.1 1108.92 2538.03 1108.92 2553.43L1109.62 2753.63ZM1199.44 2297.93H1235.84V2699.03C1235.84 2718.17 1240.51 2731.47 1249.84 2738.93C1259.64 2745.93 1271.31 2749.43 1284.84 2749.43H1293.94V2787.23H1281.34C1269.67 2787.23 1258.71 2785.6 1248.44 2782.33C1238.64 2778.6 1230.01 2773.23 1222.54 2766.23C1215.54 2758.77 1209.94 2749.2 1205.74 2737.53C1201.54 2725.87 1199.44 2711.87 1199.44 2695.53V2297.93ZM1343.58 2297.93H1380.68V2352.53H1343.58V2297.93ZM1343.58 2437.93H1380.68V2787.93H1343.58V2437.93ZM1674.45 2489.03C1680.05 2500.7 1683.31 2512.6 1684.25 2524.73C1685.18 2536.4 1685.65 2548.53 1685.65 2561.13V2787.93H1648.55V2539.43C1648.55 2515.63 1642.25 2497.43 1629.65 2484.83C1617.05 2472.23 1602.81 2465.93 1586.95 2465.93C1578.08 2465.93 1566.65 2467.33 1552.65 2470.13C1539.11 2472.93 1523.71 2479.93 1506.45 2491.13V2787.93H1470.75V2472.23L1455.35 2457.53L1480.55 2432.33L1501.55 2453.33C1527.21 2438.87 1551.48 2431.63 1574.35 2431.63C1595.35 2431.63 1614.95 2436.07 1633.15 2444.93C1651.35 2453.33 1665.11 2468.03 1674.45 2489.03Z" fill="black"/>
  <defs>
  <clipPath id="clip0">
  <rect width="1983.12" height="1983.12" fill="white" transform="translate(6)"/>
  </clipPath>
  </defs>
  </svg>
  `;

  const SvgImage = () => <SvgXml xml={svgMarkup} width="125px" />;
  return <SvgImage />;
};

export default WelcomeIcon;
