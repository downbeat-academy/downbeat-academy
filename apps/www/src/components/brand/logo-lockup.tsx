import classnames from 'classnames'
import s from './logo.module.scss'

import type { LogoProps } from './types'

const LogoLockup = ({ color = 'brand', width, className }: LogoProps) => {
	const classes = classnames([s[color], className])

	return (
		<svg
			width={width}
			height={width * 0.1607}
			viewBox="0 0 1244 200"
			xmlns="http://www.w3.org/2000/svg"
			className={classes}
		>
			<path d="M141.322 114.708C141.322 114.708 144.181 105.511 153.121 96.4344C160.249 89.1815 176.64 76.9044 176.64 76.9044C176.64 76.9044 176.64 122.447 176.64 122.407C176.64 165.276 142.127 200 99.5199 200C56.9127 200 22.4 165.235 22.4 122.407C22.4 80.1054 52.9258 54.0113 78.5385 48.0551C120.703 38.2496 118.729 97.812 118.729 97.812C114.259 94.3679 105.48 91.8152 99.7213 91.8152C83.0489 91.8152 69.5177 105.429 69.5177 122.204C69.5177 138.979 83.0489 152.593 99.7213 152.593C116.394 152.593 129.925 138.979 129.925 122.204V0C129.925 0.121556 179.982 12.1556 176.64 45.9887C174.948 63.0875 154.49 77.5122 146.557 91.5721C138.785 105.308 141.322 114.708 141.322 114.708Z" />
			<path d="M256.645 138.923C279.299 138.923 294.401 125.736 294.401 100.462C294.401 75.1868 278.759 62 256.106 62H230.216V138.923H256.645ZM244.779 75.1868H255.027C269.59 75.1868 279.838 81.2308 279.838 100.462C279.838 119.692 269.59 125.736 255.027 125.736H244.779V75.1868Z" />
			<path d="M330.184 140.022C346.365 140.022 357.152 127.934 357.152 111.451C357.152 94.967 346.365 82.8791 330.184 82.8791C314.002 82.8791 303.215 94.967 303.215 111.451C303.215 127.934 314.002 140.022 330.184 140.022ZM329.752 128.484C322.201 128.484 317.347 122.22 317.347 111.451C317.347 100.681 322.201 94.4176 329.752 94.4176H330.615C338.166 94.4176 343.021 100.681 343.021 111.451C343.021 122.22 338.166 128.484 330.615 128.484H329.752Z" />
			<path d="M419.658 124.418L410.273 83.978H395.279L386.541 124.747L375.753 83.978H361.622L378.126 138.923H393.876L402.83 100.462L412.323 138.923H428.073L443.499 83.978H429.906L419.658 124.418Z" />
			<path d="M466.693 138.923V108.374C466.693 100.681 471.871 94.4176 478.344 94.4176H479.207C484.601 94.4176 487.729 98.2637 487.729 105.407V138.923H501.753V103.758C501.753 91.6703 495.927 82.8791 482.983 82.8791C475.971 82.8791 469.93 86.5055 466.693 92V83.978H452.67V138.923H466.693Z" />
			<path d="M545.225 140.022C560.866 140.022 569.173 126.286 569.173 111.451C569.173 96.6154 560.866 82.8791 545.225 82.8791C537.673 82.8791 531.848 87.2747 529.691 91.1209V62H515.667V138.923H529.691V131.78C531.848 135.626 537.673 140.022 545.225 140.022ZM541.988 128.484C535.516 128.484 529.691 121.89 529.691 111.451C529.691 101.011 535.516 94.4176 541.988 94.4176H542.851C549.863 94.4176 555.149 100.901 555.149 111.341C555.149 121.78 549.863 128.484 542.851 128.484H541.988Z" />
			<path d="M603.109 140.022C616.593 140.022 624.899 132.33 627.488 121.56H613.573C612.602 125.297 609.365 128.484 604.08 128.484H603.217C597.391 128.484 591.566 123.538 591.027 115.956H627.488C627.596 114.198 627.704 112.44 627.704 110.791C627.704 94.8571 619.29 82.8791 603.109 82.8791C586.928 82.8791 577.435 94.967 577.435 111.451C577.435 129.582 589.624 140.022 603.109 140.022ZM591.027 104.967C591.35 98.3736 596.313 94.4176 602.138 94.4176H603.001C608.826 94.4176 613.788 98.3736 614.112 104.967H591.027Z" />
			<path d="M653.907 140.022C660.919 140.022 666.636 136.945 669.872 132.22C669.98 134.747 670.196 137.275 670.52 138.923H683.68C683.141 135.077 683.141 130.132 683.141 126.835V102.659C683.141 89.8022 673.972 82.8791 660.487 82.8791C647.003 82.8791 638.373 90.6813 637.294 101.011H651.318C651.641 97.8242 654.77 94.4176 660.056 94.4176H660.919C666.205 94.4176 669.549 98.2637 669.549 103.209V104.527L655.956 105.736C645.277 106.615 636.215 112 636.215 123.868C636.215 133.758 644.198 140.022 653.907 140.022ZM656.712 128.484C652.936 128.484 650.023 126.286 650.023 122.879C650.023 118.374 654.338 116.506 657.898 116.176L669.549 114.967V116.505C669.549 123.648 663.831 128.484 657.575 128.484H656.712Z" />
			<path d="M730.199 138.923V126.835H722.432C717.577 126.835 716.499 125.736 716.499 120.791V95.5165H728.581V83.978H716.499V66.1758H702.475V83.978H691.364V95.5165H702.475V124.637C702.475 133.978 707.329 138.923 716.499 138.923H730.199Z" />
			<path d="M832.271 138.923L803.145 62H786.101L756.219 138.923H771.538L778.334 120.791H810.049L816.845 138.923H832.271ZM794.191 78.4835L805.087 107.604H783.296L794.191 78.4835Z" />
			<path d="M862.161 140.022C876.185 140.022 885.354 133.429 886.433 119.692H872.409C871.546 125.077 868.418 128.484 862.592 128.484H861.729C853.747 128.484 850.295 120.791 850.295 111.451C850.295 102.11 853.747 94.4176 861.729 94.4176H862.592C868.418 94.4176 871.546 97.8242 872.409 103.209H886.433C885.354 89.4725 876.185 82.8791 862.161 82.8791C847.598 82.8791 836.271 93.8681 836.271 111.451C836.271 129.033 847.598 140.022 862.161 140.022Z" />
			<path d="M912.006 140.022C919.018 140.022 924.735 136.945 927.971 132.22C928.079 134.747 928.295 137.275 928.619 138.923H941.779C941.24 135.077 941.24 130.132 941.24 126.835V102.659C941.24 89.8022 932.071 82.8791 918.586 82.8791C905.102 82.8791 896.472 90.6813 895.393 101.011H909.417C909.74 97.8242 912.869 94.4176 918.155 94.4176H919.018C924.304 94.4176 927.648 98.2637 927.648 103.209V104.527L914.056 105.736C903.376 106.615 894.314 112 894.314 123.868C894.314 133.758 902.297 140.022 912.006 140.022ZM914.811 128.484C911.035 128.484 908.122 126.286 908.122 122.879C908.122 118.374 912.437 116.506 915.997 116.176L927.648 114.967V116.505C927.648 123.648 921.93 128.484 915.674 128.484H914.811Z" />
			<path d="M976.098 140.022C983.649 140.022 989.474 135.626 991.632 131.78V138.923H1005.66V62H991.632V91.1209C989.474 87.2747 983.649 82.8791 976.098 82.8791C960.456 82.8791 952.15 96.6154 952.15 111.451C952.15 126.286 960.456 140.022 976.098 140.022ZM978.471 128.484C971.459 128.484 966.173 121.78 966.173 111.341C966.173 100.901 971.459 94.4176 978.471 94.4176H979.334C985.807 94.4176 991.632 101.011 991.632 111.451C991.632 121.89 985.807 128.484 979.334 128.484H978.471Z" />
			<path d="M1042.72 140.022C1056.2 140.022 1064.51 132.33 1067.1 121.56H1053.18C1052.21 125.297 1048.98 128.484 1043.69 128.484H1042.83C1037 128.484 1031.18 123.538 1030.64 115.956H1067.1C1067.21 114.198 1067.32 112.44 1067.32 110.791C1067.32 94.8571 1058.9 82.8791 1042.72 82.8791C1026.54 82.8791 1017.05 94.967 1017.05 111.451C1017.05 129.582 1029.24 140.022 1042.72 140.022ZM1030.64 104.967C1030.96 98.3736 1035.92 94.4176 1041.75 94.4176H1042.61C1048.44 94.4176 1053.4 98.3736 1053.72 104.967H1030.64Z" />
			<path d="M1092.98 138.923V108.374C1092.98 100.681 1098.05 94.967 1104.52 94.967H1105.38C1111.21 94.967 1113.8 98.8132 1113.8 105.956V138.923H1127.82V108.374C1127.82 100.681 1132.89 94.967 1139.36 94.967H1140.23C1146.05 94.967 1148.53 98.8132 1148.53 105.956V138.923H1162.56V104.308C1162.56 92.2198 1157.38 82.8791 1143.36 82.8791C1136.56 82.8791 1129.66 85.6264 1125.56 92.3297C1122.54 86.0659 1116.6 82.8791 1109.05 82.8791C1103.01 82.8791 1096.75 85.5165 1092.98 91.7802V83.978H1078.95V138.923H1092.98Z" />
			<path d="M1213.54 83.978L1199.52 117.385L1184.96 83.978H1169.21L1192.72 134.637V142.769C1192.72 147.714 1191.64 148.813 1186.79 148.813H1172.44V161.121H1192.08C1201.24 161.121 1206.1 156.176 1206.1 146.835V134.088L1229.08 83.978H1213.54Z" />
		</svg>
	)
}

export { LogoLockup }
