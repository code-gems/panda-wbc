// United States
import { html, TemplateResult } from "lit";

export const flagUs = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#d52d21" width="256" height="256"/>
				<rect fill="#FFF" y="21.86" width="256" height="17.9"/>
				<rect fill="#FFF" y="60.73" width="256" height="17.9"/>
				<rect fill="#FFF" y="99.61" width="256" height="17.9"/>
				<rect fill="#FFF" y="138.49" width="256" height="17.9"/>
				<rect fill="#FFF" y="177.36" width="256" height="17.9"/>
				<rect fill="#FFF" y="216.24" width="256" height="17.9"/>
				<rect fill="#221b45" width="168" height="138.54"/>
				<polygon fill="#FFF" points="12.53 118.03 14.3 122.39 18.25 123.09 15.39 126.48 16.07 131.28 12.53 129.01 8.99 131.28 9.67 126.48 6.81 123.09 10.76 122.39 12.53 118.03"/>
				<polygon fill="#FFF" points="12.53 90.34 14.3 94.7 18.25 95.4 15.39 98.79 16.07 103.58 12.53 101.32 8.99 103.58 9.67 98.79 6.81 95.4 10.76 94.7 12.53 90.34"/>
				<polygon fill="#FFF" points="12.53 62.64 14.3 67 18.25 67.7 15.39 71.1 16.07 75.89 12.53 73.63 8.99 75.89 9.67 71.1 6.81 67.7 10.76 67 12.53 62.64"/>
				<polygon fill="#FFF" points="12.53 34.95 14.3 39.31 18.25 40.01 15.39 43.41 16.07 48.2 12.53 45.94 8.99 48.2 9.67 43.41 6.81 40.01 10.76 39.31 12.53 34.95"/>
				<polygon fill="#FFF" points="12.53 7.26 14.3 11.62 18.25 12.32 15.39 15.71 16.07 20.51 12.53 18.24 8.99 20.51 9.67 15.71 6.81 12.32 10.76 11.62 12.53 7.26"/>
				<polygon fill="#FFF" points="27.14 104.78 28.91 109.14 32.86 109.84 30 113.24 30.67 118.03 27.14 115.77 23.6 118.03 24.28 113.24 21.42 109.84 25.37 109.14 27.14 104.78"/>
				<polygon fill="#FFF" points="27.14 77.09 28.91 81.45 32.86 82.15 30 85.54 30.67 90.34 27.14 88.07 23.6 90.34 24.28 85.54 21.42 82.15 25.37 81.45 27.14 77.09"/>
				<polygon fill="#FFF" points="27.14 49.4 28.91 53.75 32.86 54.45 30 57.85 30.67 62.64 27.14 60.38 23.6 62.64 24.28 57.85 21.42 54.45 25.37 53.75 27.14 49.4"/>
				<polygon fill="#FFF" points="27.14 21.7 28.91 26.06 32.86 26.76 30 30.16 30.67 34.95 27.14 32.69 23.6 34.95 24.28 30.16 21.42 26.76 25.37 26.06 27.14 21.7"/>
				<polygon fill="#FFF" points="41.3 118.03 43.08 122.39 47.03 123.09 44.17 126.48 44.84 131.28 41.3 129.01 37.77 131.28 38.44 126.48 35.58 123.09 39.54 122.39 41.3 118.03"/>
				<polygon fill="#FFF" points="41.3 90.34 43.08 94.7 47.03 95.4 44.17 98.79 44.84 103.58 41.3 101.32 37.77 103.58 38.44 98.79 35.58 95.4 39.54 94.7 41.3 90.34"/>
				<polygon fill="#FFF" points="41.3 62.64 43.08 67 47.03 67.7 44.17 71.1 44.84 75.89 41.3 73.63 37.77 75.89 38.44 71.1 35.58 67.7 39.54 67 41.3 62.64"/>
				<polygon fill="#FFF" points="41.3 34.95 43.08 39.31 47.03 40.01 44.17 43.41 44.84 48.2 41.3 45.94 37.77 48.2 38.44 43.41 35.58 40.01 39.54 39.31 41.3 34.95"/>
				<polygon fill="#FFF" points="41.3 7.26 43.08 11.62 47.03 12.32 44.17 15.71 44.84 20.51 41.3 18.24 37.77 20.51 38.44 15.71 35.58 12.32 39.54 11.62 41.3 7.26"/>
				<polygon fill="#FFF" points="55.91 104.78 57.68 109.14 61.63 109.84 58.77 113.24 59.45 118.03 55.91 115.77 52.38 118.03 53.05 113.24 50.19 109.84 54.14 109.14 55.91 104.78"/>
				<polygon fill="#FFF" points="55.91 77.09 57.68 81.45 61.63 82.15 58.77 85.54 59.45 90.34 55.91 88.07 52.38 90.34 53.05 85.54 50.19 82.15 54.14 81.45 55.91 77.09"/>
				<polygon fill="#FFF" points="55.91 49.4 57.68 53.75 61.63 54.45 58.77 57.85 59.45 62.64 55.91 60.38 52.38 62.64 53.05 57.85 50.19 54.45 54.14 53.75 55.91 49.4"/>
				<polygon fill="#FFF" points="55.91 21.7 57.68 26.06 61.63 26.76 58.77 30.16 59.45 34.95 55.91 32.69 52.38 34.95 53.05 30.16 50.19 26.76 54.14 26.06 55.91 21.7"/>
				<polygon fill="#FFF" points="70.08 118.03 71.85 122.39 75.8 123.09 72.94 126.48 73.62 131.28 70.08 129.01 66.55 131.28 67.22 126.48 64.36 123.09 68.31 122.39 70.08 118.03"/>
				<polygon fill="#FFF" points="70.08 90.34 71.85 94.7 75.8 95.4 72.94 98.79 73.62 103.58 70.08 101.32 66.55 103.58 67.22 98.79 64.36 95.4 68.31 94.7 70.08 90.34"/>
				<polygon fill="#FFF" points="70.08 62.64 71.85 67 75.8 67.7 72.94 71.1 73.62 75.89 70.08 73.63 66.55 75.89 67.22 71.1 64.36 67.7 68.31 67 70.08 62.64"/>
				<polygon fill="#FFF" points="70.08 34.95 71.85 39.31 75.8 40.01 72.94 43.41 73.62 48.2 70.08 45.94 66.55 48.2 67.22 43.41 64.36 40.01 68.31 39.31 70.08 34.95"/>
				<polygon fill="#FFF" points="70.08 7.26 71.85 11.62 75.8 12.32 72.94 15.71 73.62 20.51 70.08 18.24 66.55 20.51 67.22 15.71 64.36 12.32 68.31 11.62 70.08 7.26"/>
				<polygon fill="#FFF" points="84.69 104.78 86.46 109.14 90.41 109.84 87.55 113.24 88.22 118.03 84.69 115.77 81.15 118.03 81.83 113.24 78.97 109.84 82.92 109.14 84.69 104.78"/>
				<polygon fill="#FFF" points="84.69 77.09 86.46 81.45 90.41 82.15 87.55 85.54 88.22 90.34 84.69 88.07 81.15 90.34 81.83 85.54 78.97 82.15 82.92 81.45 84.69 77.09"/>
				<polygon fill="#FFF" points="84.69 49.4 86.46 53.75 90.41 54.45 87.55 57.85 88.22 62.64 84.69 60.38 81.15 62.64 81.83 57.85 78.97 54.45 82.92 53.75 84.69 49.4"/>
				<polygon fill="#FFF" points="84.69 21.7 86.46 26.06 90.41 26.76 87.55 30.16 88.22 34.95 84.69 32.69 81.15 34.95 81.83 30.16 78.97 26.76 82.92 26.06 84.69 21.7"/>
				<polygon fill="#FFF" points="98.86 118.03 100.62 122.39 104.58 123.09 101.72 126.48 102.39 131.28 98.86 129.01 95.32 131.28 95.99 126.48 93.13 123.09 97.09 122.39 98.86 118.03"/>
				<polygon fill="#FFF" points="98.86 90.34 100.62 94.7 104.58 95.4 101.72 98.79 102.39 103.58 98.86 101.32 95.32 103.58 95.99 98.79 93.13 95.4 97.09 94.7 98.86 90.34"/>
				<polygon fill="#FFF" points="98.86 62.64 100.62 67 104.58 67.7 101.72 71.1 102.39 75.89 98.86 73.63 95.32 75.89 95.99 71.1 93.13 67.7 97.09 67 98.86 62.64"/>
				<polygon fill="#FFF" points="98.86 34.95 100.62 39.31 104.58 40.01 101.72 43.41 102.39 48.2 98.86 45.94 95.32 48.2 95.99 43.41 93.13 40.01 97.09 39.31 98.86 34.95"/>
				<polygon fill="#FFF" points="98.86 7.26 100.62 11.62 104.58 12.32 101.72 15.71 102.39 20.51 98.86 18.24 95.32 20.51 95.99 15.71 93.13 12.32 97.09 11.62 98.86 7.26"/>
				<polygon fill="#FFF" points="113.46 104.78 115.23 109.14 119.19 109.84 116.32 113.24 117 118.03 113.46 115.77 109.93 118.03 110.6 113.24 107.74 109.84 111.7 109.14 113.46 104.78"/>
				<polygon fill="#FFF" points="113.46 77.09 115.23 81.45 119.19 82.15 116.32 85.54 117 90.34 113.46 88.07 109.93 90.34 110.6 85.54 107.74 82.15 111.7 81.45 113.46 77.09"/>
				<polygon fill="#FFF" points="113.46 49.4 115.23 53.75 119.19 54.45 116.32 57.85 117 62.64 113.46 60.38 109.93 62.64 110.6 57.85 107.74 54.45 111.7 53.75 113.46 49.4"/>
				<polygon fill="#FFF" points="113.46 21.7 115.23 26.06 119.19 26.76 116.32 30.16 117 34.95 113.46 32.69 109.93 34.95 110.6 30.16 107.74 26.76 111.7 26.06 113.46 21.7"/>
				<polygon fill="#FFF" points="127.63 118.03 129.4 122.39 133.35 123.09 130.49 126.48 131.17 131.28 127.63 129.01 124.09 131.28 124.77 126.48 121.91 123.09 125.86 122.39 127.63 118.03"/>
				<polygon fill="#FFF" points="127.63 90.34 129.4 94.7 133.35 95.4 130.49 98.79 131.17 103.58 127.63 101.32 124.09 103.58 124.77 98.79 121.91 95.4 125.86 94.7 127.63 90.34"/>
				<polygon fill="#FFF" points="127.63 62.64 129.4 67 133.35 67.7 130.49 71.1 131.17 75.89 127.63 73.63 124.09 75.89 124.77 71.1 121.91 67.7 125.86 67 127.63 62.64"/>
				<polygon fill="#FFF" points="127.63 34.95 129.4 39.31 133.35 40.01 130.49 43.41 131.17 48.2 127.63 45.94 124.09 48.2 124.77 43.41 121.91 40.01 125.86 39.31 127.63 34.95"/>
				<polygon fill="#FFF" points="127.63 7.26 129.4 11.62 133.35 12.32 130.49 15.71 131.17 20.51 127.63 18.24 124.09 20.51 124.77 15.71 121.91 12.32 125.86 11.62 127.63 7.26"/>
				<polygon fill="#FFF" points="142.24 104.78 144.01 109.14 147.96 109.84 145.1 113.24 145.77 118.03 142.24 115.77 138.7 118.03 139.38 113.24 136.52 109.84 140.47 109.14 142.24 104.78"/>
				<polygon fill="#FFF" points="142.24 77.09 144.01 81.45 147.96 82.15 145.1 85.54 145.77 90.34 142.24 88.07 138.7 90.34 139.38 85.54 136.52 82.15 140.47 81.45 142.24 77.09"/>
				<polygon fill="#FFF" points="142.24 49.4 144.01 53.75 147.96 54.45 145.1 57.85 145.77 62.64 142.24 60.38 138.7 62.64 139.38 57.85 136.52 54.45 140.47 53.75 142.24 49.4"/>
				<polygon fill="#FFF" points="142.24 21.7 144.01 26.06 147.96 26.76 145.1 30.16 145.77 34.95 142.24 32.69 138.7 34.95 139.38 30.16 136.52 26.76 140.47 26.06 142.24 21.7"/>
				<polygon fill="#FFF" points="156.41 118.03 158.18 122.39 162.13 123.09 159.27 126.48 159.94 131.28 156.41 129.01 152.87 131.28 153.55 126.48 150.69 123.09 154.64 122.39 156.41 118.03"/>
				<polygon fill="#FFF" points="156.41 90.34 158.18 94.7 162.13 95.4 159.27 98.79 159.94 103.58 156.41 101.32 152.87 103.58 153.55 98.79 150.69 95.4 154.64 94.7 156.41 90.34"/>
				<polygon fill="#FFF" points="156.41 62.64 158.18 67 162.13 67.7 159.27 71.1 159.94 75.89 156.41 73.63 152.87 75.89 153.55 71.1 150.69 67.7 154.64 67 156.41 62.64"/>
				<polygon fill="#FFF" points="156.41 34.95 158.18 39.31 162.13 40.01 159.27 43.41 159.94 48.2 156.41 45.94 152.87 48.2 153.55 43.41 150.69 40.01 154.64 39.31 156.41 34.95"/>
				<polygon fill="#FFF" points="156.41 7.26 158.18 11.62 162.13 12.32 159.27 15.71 159.94 20.51 156.41 18.24 152.87 20.51 153.55 15.71 150.69 12.32 154.64 11.62 156.41 7.26"/>
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#d52d21" width="256" height="192"/>
				<rect fill="#FFF" y="16.39" width="256" height="13.43"/>
				<rect fill="#FFF" y="45.55" width="256" height="13.43"/>
				<rect fill="#FFF" y="74.71" width="256" height="13.43"/>
				<rect fill="#FFF" y="103.87" width="256" height="13.43"/>
				<rect fill="#FFF" y="133.02" width="256" height="13.43"/>
				<rect fill="#FFF" y="162.18" width="256" height="13.43"/>
				<rect fill="#221b45" width="136.95" height="103.87"/>
				<polygon fill="#FFF" points="10.21 88.49 11.65 91.76 14.88 92.28 12.54 94.83 13.1 98.42 10.21 96.73 7.33 98.42 7.88 94.83 5.55 92.28 8.77 91.76 10.21 88.49"/>
				<polygon fill="#FFF" points="10.21 67.73 11.65 71 14.88 71.52 12.54 74.07 13.1 77.66 10.21 75.96 7.33 77.66 7.88 74.07 5.55 71.52 8.77 71 10.21 67.73"/>
				<polygon fill="#FFF" points="10.21 46.97 11.65 50.23 14.88 50.76 12.54 53.3 13.1 56.9 10.21 55.2 7.33 56.9 7.88 53.3 5.55 50.76 8.77 50.23 10.21 46.97"/>
				<polygon fill="#FFF" points="10.21 26.2 11.65 29.47 14.88 30 12.54 32.54 13.1 36.14 10.21 34.44 7.33 36.14 7.88 32.54 5.55 30 8.77 29.47 10.21 26.2"/>
				<polygon fill="#FFF" points="10.21 5.44 11.65 8.71 14.88 9.23 12.54 11.78 13.1 15.38 10.21 13.68 7.33 15.38 7.88 11.78 5.55 9.23 8.77 8.71 10.21 5.44"/>
				<polygon fill="#FFF" points="22.12 78.56 23.56 81.83 26.79 82.35 24.45 84.9 25 88.49 22.12 86.79 19.24 88.49 19.79 84.9 17.46 82.35 20.68 81.83 22.12 78.56"/>
				<polygon fill="#FFF" points="22.12 57.79 23.56 61.06 26.79 61.59 24.45 64.13 25 67.73 22.12 66.03 19.24 67.73 19.79 64.13 17.46 61.59 20.68 61.06 22.12 57.79"/>
				<polygon fill="#FFF" points="22.12 37.03 23.56 40.3 26.79 40.83 24.45 43.37 25 46.97 22.12 45.27 19.24 46.97 19.79 43.37 17.46 40.83 20.68 40.3 22.12 37.03"/>
				<polygon fill="#FFF" points="22.12 16.27 23.56 19.54 26.79 20.06 24.45 22.61 25 26.2 22.12 24.5 19.24 26.2 19.79 22.61 17.46 20.06 20.68 19.54 22.12 16.27"/>
				<polygon fill="#FFF" points="33.67 88.49 35.11 91.76 38.34 92.28 36 94.83 36.55 98.42 33.67 96.73 30.79 98.42 31.34 94.83 29.01 92.28 32.23 91.76 33.67 88.49"/>
				<polygon fill="#FFF" points="33.67 67.73 35.11 71 38.34 71.52 36 74.07 36.55 77.66 33.67 75.96 30.79 77.66 31.34 74.07 29.01 71.52 32.23 71 33.67 67.73"/>
				<polygon fill="#FFF" points="33.67 46.97 35.11 50.23 38.34 50.76 36 53.3 36.55 56.9 33.67 55.2 30.79 56.9 31.34 53.3 29.01 50.76 32.23 50.23 33.67 46.97"/>
				<polygon fill="#FFF" points="33.67 26.2 35.11 29.47 38.34 30 36 32.54 36.55 36.14 33.67 34.44 30.79 36.14 31.34 32.54 29.01 30 32.23 29.47 33.67 26.2"/>
				<polygon fill="#FFF" points="33.67 5.44 35.11 8.71 38.34 9.23 36 11.78 36.55 15.38 33.67 13.68 30.79 15.38 31.34 11.78 29.01 9.23 32.23 8.71 33.67 5.44"/>
				<polygon fill="#FFF" points="45.58 78.56 47.02 81.83 50.24 82.35 47.91 84.9 48.46 88.49 45.58 86.79 42.7 88.49 43.25 84.9 40.92 82.35 44.14 81.83 45.58 78.56"/>
				<polygon fill="#FFF" points="45.58 57.79 47.02 61.06 50.24 61.59 47.91 64.13 48.46 67.73 45.58 66.03 42.7 67.73 43.25 64.13 40.92 61.59 44.14 61.06 45.58 57.79"/>
				<polygon fill="#FFF" points="45.58 37.03 47.02 40.3 50.24 40.83 47.91 43.37 48.46 46.97 45.58 45.27 42.7 46.97 43.25 43.37 40.92 40.83 44.14 40.3 45.58 37.03"/>
				<polygon fill="#FFF" points="45.58 16.27 47.02 19.54 50.24 20.06 47.91 22.61 48.46 26.2 45.58 24.5 42.7 26.2 43.25 22.61 40.92 20.06 44.14 19.54 45.58 16.27"/>
				<polygon fill="#FFF" points="57.13 88.49 58.57 91.76 61.79 92.28 59.46 94.83 60.01 98.42 57.13 96.73 54.25 98.42 54.8 94.83 52.46 92.28 55.69 91.76 57.13 88.49"/>
				<polygon fill="#FFF" points="57.13 67.73 58.57 71 61.79 71.52 59.46 74.07 60.01 77.66 57.13 75.96 54.25 77.66 54.8 74.07 52.46 71.52 55.69 71 57.13 67.73"/>
				<polygon fill="#FFF" points="57.13 46.97 58.57 50.23 61.79 50.76 59.46 53.3 60.01 56.9 57.13 55.2 54.25 56.9 54.8 53.3 52.46 50.76 55.69 50.23 57.13 46.97"/>
				<polygon fill="#FFF" points="57.13 26.2 58.57 29.47 61.79 30 59.46 32.54 60.01 36.14 57.13 34.44 54.25 36.14 54.8 32.54 52.46 30 55.69 29.47 57.13 26.2"/>
				<polygon fill="#FFF" points="57.13 5.44 58.57 8.71 61.79 9.23 59.46 11.78 60.01 15.38 57.13 13.68 54.25 15.38 54.8 11.78 52.46 9.23 55.69 8.71 57.13 5.44"/>
				<polygon fill="#FFF" points="69.04 78.56 70.48 81.83 73.7 82.35 71.37 84.9 71.92 88.49 69.04 86.79 66.16 88.49 66.7 84.9 64.37 82.35 67.6 81.83 69.04 78.56"/>
				<polygon fill="#FFF" points="69.04 57.79 70.48 61.06 73.7 61.59 71.37 64.13 71.92 67.73 69.04 66.03 66.16 67.73 66.7 64.13 64.37 61.59 67.6 61.06 69.04 57.79"/>
				<polygon fill="#FFF" points="69.04 37.03 70.48 40.3 73.7 40.83 71.37 43.37 71.92 46.97 69.04 45.27 66.16 46.97 66.7 43.37 64.37 40.83 67.6 40.3 69.04 37.03"/>
				<polygon fill="#FFF" points="69.04 16.27 70.48 19.54 73.7 20.06 71.37 22.61 71.92 26.2 69.04 24.5 66.16 26.2 66.7 22.61 64.37 20.06 67.6 19.54 69.04 16.27"/>
				<polygon fill="#FFF" points="80.58 88.49 82.03 91.76 85.25 92.28 82.92 94.83 83.47 98.42 80.58 96.73 77.7 98.42 78.25 94.83 75.92 92.28 79.14 91.76 80.58 88.49"/>
				<polygon fill="#FFF" points="80.58 67.73 82.03 71 85.25 71.52 82.92 74.07 83.47 77.66 80.58 75.96 77.7 77.66 78.25 74.07 75.92 71.52 79.14 71 80.58 67.73"/>
				<polygon fill="#FFF" points="80.58 46.97 82.03 50.23 85.25 50.76 82.92 53.3 83.47 56.9 80.58 55.2 77.7 56.9 78.25 53.3 75.92 50.76 79.14 50.23 80.58 46.97"/>
				<polygon fill="#FFF" points="80.58 26.2 82.03 29.47 85.25 30 82.92 32.54 83.47 36.14 80.58 34.44 77.7 36.14 78.25 32.54 75.92 30 79.14 29.47 80.58 26.2"/>
				<polygon fill="#FFF" points="80.58 5.44 82.03 8.71 85.25 9.23 82.92 11.78 83.47 15.38 80.58 13.68 77.7 15.38 78.25 11.78 75.92 9.23 79.14 8.71 80.58 5.44"/>
				<polygon fill="#FFF" points="92.49 78.56 93.93 81.83 97.16 82.35 94.83 84.9 95.38 88.49 92.49 86.79 89.61 88.49 90.16 84.9 87.83 82.35 91.05 81.83 92.49 78.56"/>
				<polygon fill="#FFF" points="92.49 57.79 93.93 61.06 97.16 61.59 94.83 64.13 95.38 67.73 92.49 66.03 89.61 67.73 90.16 64.13 87.83 61.59 91.05 61.06 92.49 57.79"/>
				<polygon fill="#FFF" points="92.49 37.03 93.93 40.3 97.16 40.83 94.83 43.37 95.38 46.97 92.49 45.27 89.61 46.97 90.16 43.37 87.83 40.83 91.05 40.3 92.49 37.03"/>
				<polygon fill="#FFF" points="92.49 16.27 93.93 19.54 97.16 20.06 94.83 22.61 95.38 26.2 92.49 24.5 89.61 26.2 90.16 22.61 87.83 20.06 91.05 19.54 92.49 16.27"/>
				<polygon fill="#FFF" points="104.04 88.49 105.48 91.76 108.71 92.28 106.37 94.83 106.92 98.42 104.04 96.73 101.16 98.42 101.71 94.83 99.38 92.28 102.6 91.76 104.04 88.49"/>
				<polygon fill="#FFF" points="104.04 67.73 105.48 71 108.71 71.52 106.37 74.07 106.92 77.66 104.04 75.96 101.16 77.66 101.71 74.07 99.38 71.52 102.6 71 104.04 67.73"/>
				<polygon fill="#FFF" points="104.04 46.97 105.48 50.23 108.71 50.76 106.37 53.3 106.92 56.9 104.04 55.2 101.16 56.9 101.71 53.3 99.38 50.76 102.6 50.23 104.04 46.97"/>
				<polygon fill="#FFF" points="104.04 26.2 105.48 29.47 108.71 30 106.37 32.54 106.92 36.14 104.04 34.44 101.16 36.14 101.71 32.54 99.38 30 102.6 29.47 104.04 26.2"/>
				<polygon fill="#FFF" points="104.04 5.44 105.48 8.71 108.71 9.23 106.37 11.78 106.92 15.38 104.04 13.68 101.16 15.38 101.71 11.78 99.38 9.23 102.6 8.71 104.04 5.44"/>
				<polygon fill="#FFF" points="115.95 78.56 117.39 81.83 120.61 82.35 118.28 84.9 118.83 88.49 115.95 86.79 113.07 88.49 113.62 84.9 111.29 82.35 114.51 81.83 115.95 78.56"/>
				<polygon fill="#FFF" points="115.95 57.79 117.39 61.06 120.61 61.59 118.28 64.13 118.83 67.73 115.95 66.03 113.07 67.73 113.62 64.13 111.29 61.59 114.51 61.06 115.95 57.79"/>
				<polygon fill="#FFF" points="115.95 37.03 117.39 40.3 120.61 40.83 118.28 43.37 118.83 46.97 115.95 45.27 113.07 46.97 113.62 43.37 111.29 40.83 114.51 40.3 115.95 37.03"/>
				<polygon fill="#FFF" points="115.95 16.27 117.39 19.54 120.61 20.06 118.28 22.61 118.83 26.2 115.95 24.5 113.07 26.2 113.62 22.61 111.29 20.06 114.51 19.54 115.95 16.27"/>
				<polygon fill="#FFF" points="127.5 88.49 128.94 91.76 132.16 92.28 129.83 94.83 130.38 98.42 127.5 96.73 124.62 98.42 125.17 94.83 122.84 92.28 126.06 91.76 127.5 88.49"/>
				<polygon fill="#FFF" points="127.5 67.73 128.94 71 132.16 71.52 129.83 74.07 130.38 77.66 127.5 75.96 124.62 77.66 125.17 74.07 122.84 71.52 126.06 71 127.5 67.73"/>
				<polygon fill="#FFF" points="127.5 46.97 128.94 50.23 132.16 50.76 129.83 53.3 130.38 56.9 127.5 55.2 124.62 56.9 125.17 53.3 122.84 50.76 126.06 50.23 127.5 46.97"/>
				<polygon fill="#FFF" points="127.5 26.2 128.94 29.47 132.16 30 129.83 32.54 130.38 36.14 127.5 34.44 124.62 36.14 125.17 32.54 122.84 30 126.06 29.47 127.5 26.2"/>
				<polygon fill="#FFF" points="127.5 5.44 128.94 8.71 132.16 9.23 129.83 11.78 130.38 15.38 127.5 13.68 124.62 15.38 125.17 11.78 122.84 9.23 126.06 8.71 127.5 5.44"/>
			</svg>
		`;
}