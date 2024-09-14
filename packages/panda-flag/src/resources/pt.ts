// Portugal
import { html, TemplateResult } from "lit";

export const flagPt = (square: boolean): TemplateResult => {
	return !square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
			<defs>
			<style>
				.cls-1 { fill: #060; }
				.cls-2, .cls-5 { fill: red; }
				.cls-3, .cls-6, .cls-7, .cls-8 { fill: #ff0; }
				.cls-3, .cls-4, .cls-5, .cls-7, .cls-8 { stroke: #000; stroke-width: 0.25px; }
				.cls-3 { stroke-linecap: round; stroke-linejoin: round; fill-rule: evenodd; }
				.cls-10, .cls-4 { fill: #fff; }
				.cls-4, .cls-5, .cls-7 { stroke-miterlimit: 6.03; }
				.cls-8 { stroke-miterlimit: 6.03; }
				.cls-9 { fill: #039; }
			</style>
		</defs>
				<rect class="cls-1" width="92.16" height="192"/>
				<rect class="cls-2" x="92.16" width="163.84" height="192"/>
				
				<path class="cls-3" d="M125.57,122.16c-12.82-.39-71.61-36.95-72-42.77L56.8,74c5.83,8.44,65.94,44,71.84,42.73l-3.07,5.42"/>
				<path class="cls-3" d="M56.12,73.27C55,76.35,71.46,86.51,91.3,98.53s37,19.45,38.22,18.38a10.26,10.26,0,0,0,.58-1.06c-.24.35-.82.47-1.72.21C119.67,114.83,60.88,81,57,73.47a2.45,2.45,0,0,1-.26-1.21h-.06l-.49.87-.07.14Zm69.76,49.06c-4.49,4.15-77.34-39.11-72.76-43.21l.49-.86.1,0c-1.62,4.82,32.66,24.34,34.67,25.59,19.84,12.24,36.55,19.38,38,17.53l-.53.92Z"/>
				<path class="cls-3" d="M92.44,82.92c12.83-.1,28.67-1.75,37.78-5.37l-2-3.17c-5.39,3-21.31,4.92-35.93,5.21C75,79.43,62.84,77.83,56.72,73.74l-1.85,3.39c11.24,4.73,22.76,5.74,37.57,5.79"/>
				<path class="cls-3" d="M130.75,77.63c-.31.49-6.26,2.54-15,4C105.13,83.74,80.86,83.82,70,82a66,66,0,0,1-15.69-4.14c.17-.33.28-.57.44-.88A68.56,68.56,0,0,0,70.18,81a164.34,164.34,0,0,0,22.19,1.41,157.3,157.3,0,0,0,23.18-1.71c9-1.45,13.88-3.3,14.57-4.16l.63,1.09ZM129,74.4c-15.6,7.28-57,7.11-72.9.27l.5-.85c14.57,6.65,57.57,7,71.77-.45l.63,1Z"/>
				<path class="cls-3" d="M50.3,98.32c16.37,8.57,67.23,8.46,84.16.3l-.2-4.24c-2.31,3.59-23.4,7-42.11,6.88s-36.09-3-41.89-6.74l0,3.8"/>
				<path class="cls-3" d="M134.86,97.71v1c-1.11,1.32-8,3.31-16.74,4.71-16.88,3-54.53,2.51-68.33-4.66V97.59c17.5,9.06,68.59,8.84,85.07.12Zm0-3.59v1c-1.11,1.32-8.05,3.31-16.74,4.71-16.88,3-54.53,2.51-68.34-4.66V94c17.5,9.06,68.58,8.84,85.06.12Z"/>
				<path class="cls-3" d="M92.28,121.43c-18.16-.11-33.71-4.93-37-5.73l2.4,3.74c5.8,2.43,21,6,34.77,5.65s25.85-1.46,34.35-5.58l2.46-3.88c-5.79,2.72-25.5,5.77-37,5.8"/>
				<path class="cls-3" d="M127.72,118.64c-.36.55-.73,1.09-1.1,1.62a96.2,96.2,0,0,1-13,3.31c-17.38,3.94-45.23,1.19-56.77-4.1l-.5-.85.08-.13.85.33c11,3.92,23.38,5.49,35.1,5.77a120.13,120.13,0,0,0,20.92-1.92c9.65-2,12.75-3.11,14.41-4Zm2.13-3.5,0,0c-.27.46-.55.92-.83,1.38-9,2.88-21.44,5-36.56,5.34-20.81-.53-34.28-4.58-37.48-5.58l-.47-.91A158.22,158.22,0,0,0,92.49,121a140.34,140.34,0,0,0,20-1.71,103.48,103.48,0,0,0,16.35-3.62l-.07-.08,1.07-.4Z"/>
				<path class="cls-3" d="M130.07,95c-.86,23.43-16.8,37.57-38,38.43-22.54-.68-37-18.09-37.39-37.78.75-22.91,18.92-37.39,38.79-37.23a39.16,39.16,0,0,1,28.23,14.09c5,6,7.19,12.58,8.33,22.49ZM92.22,54.25c23.12,0,42.14,18.74,42.14,41.73-2.47,55.29-81.73,55.44-84.13,0a41.94,41.94,0,0,1,42-41.73"/>
				<path class="cls-3" d="M92.33,54.11a42,42,0,0,1,42,41.86c-2.37,55.54-81.68,55.53-84,0a42,42,0,0,1,42-41.86ZM51.23,96A41.1,41.1,0,1,0,92.33,55,41.18,41.18,0,0,0,51.23,96Z"/>
				<path class="cls-3" d="M92.36,57.59A38.35,38.35,0,1,1,53.87,95.93,38.57,38.57,0,0,1,92.36,57.59ZM54.79,95.93A37.57,37.57,0,1,0,92.36,58.51,37.65,37.65,0,0,0,54.79,95.93Z"/>
				<path class="cls-3" d="M94.06,53.94H90.45v84.11h3.61Z"/>
				<path class="cls-3" d="M93.7,53.46h.91v85.08H93.7V53.46Zm-3.58,0h.93v85.08h-.93V53.46Z"/>
				<path class="cls-3" d="M134.38,97.59V94.48l-2.54-2.36-14.43-3.8L96.61,86.2l-25,1.27L53.74,91.7l-3.59,2.65v3.11l9.11-4.07L80.91,90H101.7L117,91.7l10.61,2.54Z"/>
				<path class="cls-3" d="M92.35,89.49c12.45,0,35.42,1.76,42.51,8.15v1.1c-2.29-2.75-9.75-4.76-15.5-5.91-15-3.21-40-3.06-54.6.06-6,1.18-14,3.53-15,5.85V97.61c5.24-6,30.65-8.19,42.57-8.12Zm0-3.59c12.45,0,35.42,1.76,42.51,8.15v1.1c-2.28-2.75-9.75-4.76-15.5-5.91-15-3.21-39.92-3.06-54.54.06-5.79,1.09-14.11,3.53-15,5.85V94c5.46-6.12,30.5-8.16,42.56-8.12Z"/>
				<path class="cls-3" d="M92.15,67.58c15.64-.07,29.28,2.18,35.52,5.37L130,76.87c-5.43-2.91-20.15-5.94-37.78-5.49C77.8,71.47,62.45,73,54.74,77.05l2.72-4.53c6.32-3.26,21.23-4.92,34.69-4.93"/>
				<path class="cls-3" d="M92.35,70.82c12.08-.1,29.65,1.22,37.74,5.63l.68,1.19c-9.14-4.72-25.57-6-38.43-5.86-13.43-.13-29.42,1.14-37.85,5.77l.67-1.26c9.77-4.76,23.43-5.37,37.19-5.47Zm0-3.58c12.31.1,26.64.55,35.72,5.59l1,1.57c-11.18-8.53-60.2-7.93-72.13-.9l.87-1.3c9.76-4.4,21.7-4.75,34.55-5Z"/>
				<path class="cls-3" d="M113.23,113.37c-19.75-4-53.35.08-56.4,5.27l-1.95-3.16c9.78-8,44.15-8.63,60.14-5.27l-1.79,3.16"/>
				<path class="cls-3" d="M92.19,111.34A127.55,127.55,0,0,1,113.42,113l-.49.88c-14.87-2.48-34-2.38-48.53,1.65-2.68.75-7.1,2.46-7.55,3.87l-.5-.81c.15-.84,2.82-2.57,7.82-4,9.7-2.77,18.77-3.24,28-3.3Zm.33-3.63a130.41,130.41,0,0,1,22.81,2l-.52.91c-15.34-2.76-35.52-2.93-51.44,1.47-3,.87-8.19,2.75-8.36,4.25l-.5-.88c.12-1.35,4.6-3.12,8.64-4.29,9.38-2.72,19.64-3.42,29.37-3.43Z"/>
				<path class="cls-3" d="M129.54,116l-3.13,4.84-9-8L94.06,97.2,67.75,82.82,54.09,78.17,57,72.79l1-.54,8.49,2.12,28,14.37,16.13,10.15,13.58,9.72,5.52,6.34Z"/>
				<path class="cls-3" d="M53.6,78.29c5-4.29,75.23,37.51,72.78,43.26l-.52.81-.24.19s.32-.36,0-1.23c-1-6.19-66.55-46.49-72.53-42l.53-1Zm76.58,37.6c1.51-3-14.82-15.24-35.07-27.17C74.39,77,59.46,70.14,56.73,72.19l-.6,1.1c0,.06,0-.08.15-.18a2.6,2.6,0,0,1,1.68-.4c8.43-.28,65.89,30.88,71.66,43.51,0,.41,0,.49-.12.69l.68-1Z"/>
				
				<path class="cls-4" d="M66.88,100.28a25.64,25.64,0,0,0,25.4,25.44,25.5,25.5,0,0,0,25.5-25.42h0v-34l-50.91-.06v34Z"/>
				<path class="cls-5" d="M67.83,100.33v0A24.17,24.17,0,0,0,75,117.5a24.36,24.36,0,0,0,34.48,0,24.18,24.18,0,0,0,7.16-17.17h0V67.42H67.86l0,32.92m39-23v21l0,2.22h0a15.61,15.61,0,0,1-.1,1.82,14.26,14.26,0,0,1-4.18,8.45A14.58,14.58,0,0,1,92.24,115,14.41,14.41,0,0,1,82,110.66a14.58,14.58,0,0,1-4.3-10.27V77.22l29.13.06Z"/>
					
				<path class="cls-6" d="M71,76a3,3,0,0,1,1.75-2.93,2.93,2.93,0,0,1,1.8,3L71,76"/>
				<path class="cls-7" d="M69.54,73.12l-.29,2.72H71a2.42,2.42,0,0,1,1.75-2.62,2.63,2.63,0,0,1,1.75,2.62H76.3L76,73.11Z"/>
				<path class="cls-7" d="M69.13,75.86h7.26a.31.31,0,0,1,.28.33.32.32,0,0,1-.28.34H69.13a.31.31,0,0,1-.28-.34A.31.31,0,0,1,69.13,75.86Z"/>
				<path class="cls-7" d="M71.77,75.84a1.87,1.87,0,0,1,1-1.82,1.9,1.9,0,0,1,1,1.82h-2"/>
				<path class="cls-7" d="M69.28,72h7a.29.29,0,0,1,.26.3.29.29,0,0,1-.26.31h-7a.29.29,0,0,1-.27-.31A.29.29,0,0,1,69.28,72Z"/>
				<path class="cls-7" d="M69.43,72.6h6.66a.28.28,0,0,1,.25.3.27.27,0,0,1-.25.3H69.43a.28.28,0,0,1-.26-.3A.29.29,0,0,1,69.43,72.6Z"/>
				<path class="cls-7" d="M71.58,68.06h.52v.37h.39v-.38H73v.38h.38v-.38H74v.86a.23.23,0,0,1-.24.23H71.82a.24.24,0,0,1-.24-.23v-.85Z"/>
				<path class="cls-7" d="M73.56,69.21,73.68,72H71.83L72,69.2h1.6"/>
				<path class="cls-7" d="M71.31,70.49l0,1.5H69.6l.05-1.5Z"/>
				<path class="cls-7" d="M75.86,70.49l0,1.5H74.14l0-1.5Z"/>
				<path class="cls-7" d="M69.32,69.41h.51v.38h.38v-.38h.53v.38h.37v-.38h.53v.86a.22.22,0,0,1-.23.22H69.56a.24.24,0,0,1-.24-.22v-.86Z"/>
				<path class="cls-7" d="M73.87,69.41h.51v.38h.38v-.38h.52v.38h.38v-.38h.53v.86a.22.22,0,0,1-.23.22H74.11a.23.23,0,0,1-.24-.22v-.86Z"/>
				<path d="M72.58,70.09a.19.19,0,1,1,.37,0v.66h-.37v-.66"/>
				<path d="M70.29,71a.18.18,0,1,1,.36,0v.51h-.36V71"/>
				<path d="M74.85,71a.18.18,0,1,1,.36,0v.51h-.36V71"/>
				
				<path class="cls-6" d="M71,95.88a3,3,0,0,1,1.75-2.94,2.94,2.94,0,0,1,1.8,3l-3.55,0"/>
				<path class="cls-7" d="M69.54,93l-.29,2.72H71a2.4,2.4,0,0,1,1.75-2.61,2.6,2.6,0,0,1,1.75,2.61H76.3L76,93l-6.44,0Z"/>
				<path class="cls-7" d="M69.13,95.72h7.26a.32.32,0,0,1,.28.34.31.31,0,0,1-.28.33H69.13a.31.31,0,0,1-.28-.33A.31.31,0,0,1,69.13,95.72Z"/>
				<path class="cls-7" d="M71.77,95.71a1.87,1.87,0,0,1,1-1.82,1.88,1.88,0,0,1,1,1.82h-2"/>
				<path class="cls-7" d="M69.28,91.86h7a.28.28,0,0,1,.26.3.29.29,0,0,1-.26.3h-7a.3.3,0,0,1,0-.6Z"/>
				<path class="cls-7" d="M69.43,92.47h6.66a.27.27,0,0,1,.25.3.28.28,0,0,1-.25.3H69.43a.29.29,0,0,1-.26-.3A.28.28,0,0,1,69.43,92.47Z"/>
				<path class="cls-7" d="M71.58,87.92h.52v.38h.39v-.38H73v.38h.38v-.38H74v.86a.23.23,0,0,1-.24.22H71.82a.24.24,0,0,1-.24-.22v-.86Z"/>
				<path class="cls-7" d="M73.56,89.08l.12,2.76H71.83L72,89.07h1.6"/>
				<path class="cls-7" d="M71.31,90.36l0,1.49H69.6l.05-1.49Z"/>
				<path class="cls-7" d="M75.86,90.36l0,1.49H74.14l0-1.49Z"/>
				<path class="cls-7" d="M69.32,89.28h.51v.37h.38v-.38h.53v.38h.37v-.38h.53v.87a.22.22,0,0,1-.23.22H69.56a.24.24,0,0,1-.24-.23v-.85Z"/>
				<path class="cls-7" d="M73.87,89.28h.51v.37h.38v-.38h.52v.38h.38v-.38h.53v.87a.22.22,0,0,1-.23.22H74.11a.23.23,0,0,1-.24-.23v-.85Z"/>
				<path d="M72.58,90A.19.19,0,1,1,73,90v.66h-.37V90"/>
				<path d="M70.29,90.91a.18.18,0,1,1,.36,0v.51h-.36v-.51"/>
				<path d="M74.85,90.91a.18.18,0,1,1,.36,0v.51h-.36v-.51"/>
				
				<path class="cls-6" d="M78.73,116.56a3,3,0,0,1-.85-3.31,2.91,2.91,0,0,1,3.37.8l-2.52,2.51"/>
				<path class="cls-8" d="M75.66,115.55l1.72,2.12,1.26-1.25a2.42,2.42,0,0,1-.63-3.09,2.62,2.62,0,0,1,3.09.6l1.26-1.26L80.18,111l-4.52,4.58Z"/>
				<path class="cls-8" d="M77.31,117.77l5.12-5.16a.34.34,0,0,1,.47.47l-5.12,5.16a.34.34,0,0,1-.47-.47Z"/>
				<path class="cls-8" d="M79.16,115.88a1.89,1.89,0,0,1-.61-2,1.91,1.91,0,0,1,2,.56l-1.4,1.41"/>
				<path class="cls-8" d="M74.67,114.93,79.58,110a.29.29,0,0,1,.4,0,.3.3,0,0,1,0,.41l-4.91,4.94a.29.29,0,0,1-.4,0A.3.3,0,0,1,74.67,114.93Z"/>
				<path class="cls-8" d="M75.21,115.26l4.69-4.73a.31.31,0,0,1,.43.43l-4.69,4.72a.29.29,0,0,1-.4,0A.28.28,0,0,1,75.21,115.26Z"/>
				<path class="cls-8" d="M73.5,110.53l.37-.37.27.26.27-.27-.27-.27.38-.38.27.27.27-.28-.27-.27.38-.38.61.61a.21.21,0,0,1,0,.32l-1.33,1.35a.24.24,0,0,1-.33,0l-.61-.6Z"/>
				<path class="cls-8" d="M75.72,109.94l2,1.86-1.3,1.31-1.88-2,1.14-1.13"/>
				<path class="cls-8" d="M75,112.44l1.1,1-1.25,1.26-1-1.09L75,112.44Z"/>
				<path class="cls-8" d="M78.25,109.21l1.09,1-1.24,1.26-1-1.09,1.18-1.18Z"/>
				<path class="cls-8" d="M72.87,113.09l.37-.36.26.26.27-.27-.27-.27.37-.37.27.27.26-.27-.27-.27.37-.37.62.61a.22.22,0,0,1,0,.32l-1.3,1.31a.24.24,0,0,1-.33,0l-.61-.6Z"/>
				<path class="cls-8" d="M76.08,109.86l.36-.36.27.26.26-.27-.27-.27.37-.37.27.27.27-.27-.27-.27.37-.37.61.61a.22.22,0,0,1,0,.32L77,110.45a.24.24,0,0,1-.33,0l-.6-.6Z"/>
				<path d="M75.65,111.25a.18.18,0,1,1,.26-.26l.47.46-.27.27-.46-.47"/>
				<path d="M74.71,113.55a.18.18,0,1,1,.25-.25l.37.35-.25.26-.37-.36"/>
				<path d="M77.93,110.31a.18.18,0,1,1,.25-.25l.36.36-.25.25-.36-.36"/>
						
				<path class="cls-6" d="M90.59,76a3,3,0,0,1,1.75-2.93,2.93,2.93,0,0,1,1.8,3l-3.55,0"/>
				<path class="cls-7" d="M89.14,73.12l-.3,2.72h1.78a2.43,2.43,0,0,1,1.74-2.62,2.64,2.64,0,0,1,1.76,2.62H95.9l-.32-2.74Z"/>
				<path class="cls-7" d="M88.73,75.86H96c.37,0,.37.65,0,.67H88.73C88.36,76.51,88.36,75.87,88.73,75.86Z"/>
				<path class="cls-7" d="M91.37,75.84a1.87,1.87,0,0,1,1-1.82,1.9,1.9,0,0,1,1,1.82h-2"/>
				<path class="cls-7" d="M88.88,72h7a.31.31,0,0,1,0,.61h-7A.31.31,0,0,1,88.88,72Z"/>
				<path class="cls-7" d="M89,72.6h6.66c.33,0,.34.59,0,.6H89C88.69,73.19,88.69,72.61,89,72.6Z"/>
				<path class="cls-7" d="M91.18,68.06h.52v.37h.39v-.38h.54v.38H93v-.38h.54v.86a.23.23,0,0,1-.24.23H91.42a.24.24,0,0,1-.24-.23v-.85Z"/>
				<path class="cls-7" d="M93.16,69.21,93.28,72H91.43l.12-2.77h1.61"/>
				<path class="cls-7" d="M90.91,70.49,91,72H89.19l0-1.5Z"/>
				<path class="cls-7" d="M95.46,70.49l.05,1.5H93.74l.05-1.5Z"/>
				<path class="cls-7" d="M88.92,69.41h.51v.38h.38v-.38h.53v.38h.37v-.38h.53v.86a.22.22,0,0,1-.23.22H89.16a.23.23,0,0,1-.24-.22v-.86Z"/>
				<path class="cls-7" d="M93.47,69.41H94v.38h.38v-.38h.52v.38h.38v-.38h.53v.86a.22.22,0,0,1-.23.22H93.71a.23.23,0,0,1-.24-.22v-.86Z"/>
				<path d="M92.18,70.09a.19.19,0,1,1,.37,0v.66h-.37v-.66"/>
				<path d="M89.89,71a.18.18,0,1,1,.36,0v.51h-.36V71"/>
				<path d="M94.45,71a.18.18,0,1,1,.36,0v.51h-.36V71"/>
						
				<path class="cls-6" d="M113.61,76a3,3,0,0,0-1.75-2.93,2.93,2.93,0,0,0-1.81,3l3.56,0"/>
				<path class="cls-7" d="M115.06,73.12l.29,2.72h-1.78a2.42,2.42,0,0,0-1.74-2.62,2.64,2.64,0,0,0-1.76,2.62H108.3l.32-2.74Z"/>
				<path class="cls-7" d="M115.47,75.86H108.2a.31.31,0,0,0-.27.33.31.31,0,0,0,.27.34h7.27a.32.32,0,0,0,.28-.34A.31.31,0,0,0,115.47,75.86Z"/>
				<path class="cls-7" d="M112.83,75.84a1.87,1.87,0,0,0-1-1.82,1.91,1.91,0,0,0-1,1.82h2"/>
				<path class="cls-7" d="M115.31,72h-7a.29.29,0,0,0-.27.3.29.29,0,0,0,.27.31h7a.29.29,0,0,0,.27-.31A.29.29,0,0,0,115.31,72Z"/>
				<path class="cls-7" d="M115.17,72.6h-6.66a.29.29,0,0,0-.26.3.28.28,0,0,0,.26.3h6.66a.27.27,0,0,0,.25-.3A.28.28,0,0,0,115.17,72.6Z"/>
				<path class="cls-7" d="M113,68.06h-.53v.37h-.38v-.38h-.54v.38h-.39v-.38h-.54v.86a.23.23,0,0,0,.24.23h1.89a.24.24,0,0,0,.25-.23v-.85Z"/>
				<path class="cls-7" d="M111,69.21,110.92,72h1.84l-.12-2.77H111"/>
				<path class="cls-7" d="M113.29,70.49l-.06,1.5H115l0-1.5Z"/>
				<path class="cls-7" d="M108.74,70.49l-.06,1.5h1.77l0-1.5Z"/>
				<path class="cls-7" d="M115.28,69.41h-.52v.38h-.37v-.38h-.53v.38h-.38v-.38H113v.86a.22.22,0,0,0,.23.22H115a.25.25,0,0,0,.24-.22v-.86Z"/>
				<path class="cls-7" d="M110.73,69.41h-.52v.38h-.37v-.38h-.53v.38h-.38v-.38h-.52v.86a.22.22,0,0,0,.23.22h1.85a.24.24,0,0,0,.24-.22v-.86Z"/>
				<path d="M112,70.09a.19.19,0,1,0-.37,0v.66H112v-.66"/>
				<path d="M114.3,71a.18.18,0,1,0-.35,0v.51h.35V71"/>
				<path d="M109.74,71a.18.18,0,1,0-.35,0v.51h.35V71"/>
			
				<path class="cls-6" d="M113.61,95.88a3,3,0,0,0-1.75-2.94,2.94,2.94,0,0,0-1.81,3l3.56,0"/>
				<path class="cls-7" d="M115.06,93l.29,2.72h-1.78a2.4,2.4,0,0,0-1.74-2.61,2.6,2.6,0,0,0-1.76,2.61H108.3l.32-2.74,6.44,0Z"/>
				<path class="cls-7" d="M115.47,95.72H108.2a.31.31,0,0,0-.27.34.31.31,0,0,0,.27.33h7.27a.31.31,0,0,0,.28-.33A.32.32,0,0,0,115.47,95.72Z"/>
				<path class="cls-7" d="M112.83,95.71a1.87,1.87,0,0,0-1-1.82,1.9,1.9,0,0,0-1,1.82h2"/>
				<path class="cls-7" d="M115.31,91.86h-7a.28.28,0,0,0-.27.3.29.29,0,0,0,.27.3h7a.3.3,0,0,0,0-.6Z"/>
				<path class="cls-7" d="M115.17,92.47h-6.66a.28.28,0,0,0-.26.3.29.29,0,0,0,.26.3h6.66a.28.28,0,0,0,.25-.3A.27.27,0,0,0,115.17,92.47Z"/>
				<path class="cls-7" d="M113,87.92h-.53v.38h-.38v-.38h-.54v.38h-.39v-.38h-.54v.86a.23.23,0,0,0,.24.22h1.89a.24.24,0,0,0,.25-.22v-.86Z"/>
				<path class="cls-7" d="M111,89.08l-.12,2.76h1.84l-.12-2.77H111"/>
				<path class="cls-7" d="M113.29,90.36l-.06,1.49H115l0-1.49Z"/>
				<path class="cls-7" d="M108.74,90.36l-.06,1.49h1.77l0-1.49Z"/>
				<path class="cls-7" d="M115.28,89.28h-.52v.37h-.37v-.38h-.53v.38h-.38v-.38H113v.87a.22.22,0,0,0,.23.22H115a.25.25,0,0,0,.24-.23v-.85Z"/>
				<path class="cls-7" d="M110.73,89.28h-.52v.37h-.37v-.38h-.53v.38h-.38v-.38h-.52v.87a.22.22,0,0,0,.23.22h1.85a.24.24,0,0,0,.24-.23v-.85Z"/>
				<path d="M112,90a.19.19,0,1,0-.37,0v.66H112V90"/>
				<path d="M114.3,90.91a.18.18,0,1,0-.35,0v.51h.35v-.51"/>
				<path d="M109.74,90.91a.18.18,0,1,0-.35,0v.51h.35v-.51"/>
			
				<path class="cls-6" d="M105.86,116.56a3,3,0,0,0,.86-3.31,2.92,2.92,0,0,0-3.38.8l2.52,2.51"/>
				<path class="cls-8" d="M108.94,115.55l-1.73,2.12L106,116.42a2.45,2.45,0,0,0,.63-3.09,2.63,2.63,0,0,0-3.1.6l-1.25-1.26,2.17-1.7,4.53,4.58Z"/>
				<path class="cls-8" d="M107.29,117.77l-5.12-5.16a.32.32,0,0,0-.44,0,.31.31,0,0,0,0,.43l5.12,5.16a.32.32,0,0,0,.44,0A.31.31,0,0,0,107.29,117.77Z"/>
				<path class="cls-8" d="M105.44,115.88a1.85,1.85,0,0,0,.6-2,1.9,1.9,0,0,0-2,.56l1.4,1.41"/>
				<path class="cls-8" d="M109.92,114.93,105,110a.29.29,0,0,0-.4,0,.3.3,0,0,0,0,.41l4.91,4.94a.29.29,0,0,0,.4,0A.3.3,0,0,0,109.92,114.93Z"/>
				<path class="cls-8" d="M109.39,115.26l-4.7-4.73a.28.28,0,0,0-.39,0,.29.29,0,0,0,0,.4l4.7,4.72a.27.27,0,0,0,.39,0A.28.28,0,0,0,109.39,115.26Z"/>
				<path class="cls-8" d="M111.09,110.53l-.37-.37-.27.26-.27-.27.28-.27-.39-.38-.27.27-.27-.28.27-.27-.38-.38-.61.61a.22.22,0,0,0,0,.32l1.33,1.35a.25.25,0,0,0,.34,0l.6-.6Z"/>
				<path class="cls-8" d="M108.88,109.94l-2,1.86,1.31,1.31,1.87-2-1.13-1.13"/>
				<path class="cls-8" d="M109.55,112.44l-1.09,1,1.24,1.26,1-1.09-1.17-1.18Z"/>
				<path class="cls-8" d="M106.35,109.21l-1.1,1,1.25,1.26,1-1.09-1.17-1.18Z"/>
				<path class="cls-8" d="M111.72,113.09l-.36-.36-.27.26-.26-.27.27-.27-.37-.37-.27.27-.27-.27.27-.27-.37-.37-.61.61a.22.22,0,0,0,0,.32l1.31,1.31a.24.24,0,0,0,.33,0l.6-.6Z"/>
				<path class="cls-8" d="M108.52,109.86l-.37-.36-.26.26-.27-.27.27-.27-.37-.37-.27.27-.26-.27.27-.27-.37-.37-.62.61a.22.22,0,0,0,0,.32l1.3,1.31a.24.24,0,0,0,.33,0l.61-.6Z"/>
				<path d="M109,111.25a.18.18,0,1,0-.26-.26l-.47.46.26.27.47-.47"/>
				<path d="M109.88,113.55a.18.18,0,1,0-.25-.25l-.36.35.25.26.36-.36"/>
				<path d="M106.67,110.31a.18.18,0,1,0-.25-.25l-.37.36.25.25.37-.36"/>

				<path class="cls-9" d="M89.18,96.59h0A3.6,3.6,0,0,0,90.13,99a3.06,3.06,0,0,0,4.55,0,3.59,3.59,0,0,0,.94-2.44V92H89.2l0,4.62"/>
				<circle class="cls-10" cx="90.66" cy="93.73" r="0.64" transform="translate(-3.35 184.09) rotate(-89.82)"/>
				<circle class="cls-10" cx="94.22" cy="93.73" r="0.64" transform="translate(0.2 187.67) rotate(-89.82)"/>
				<circle class="cls-10" cx="92.44" cy="95.44" r="0.64"/>
				<circle class="cls-10" cx="90.66" cy="97.24" r="0.64" transform="translate(-6.86 187.6) rotate(-89.82)"/>
				<circle class="cls-10" cx="94.22" cy="97.23" r="0.64" transform="translate(-3.31 191.15) rotate(-89.82)"/>
			
				<path class="cls-9" d="M89.18,85.43h0a3.58,3.58,0,0,0,.95,2.44,3.11,3.11,0,0,0,2.28,1,3.08,3.08,0,0,0,2.27-1,3.59,3.59,0,0,0,.94-2.44V80.82H89.2l0,4.62"/>
				<circle class="cls-10" cx="90.66" cy="82.57" r="0.64" transform="translate(7.81 172.97) rotate(-89.82)"/>
				<circle class="cls-10" cx="94.22" cy="82.57" r="0.64" transform="translate(11.36 176.55) rotate(-89.82)"/>
				<circle class="cls-10" cx="92.44" cy="84.29" r="0.64"/>
				<circle class="cls-10" cx="90.66" cy="86.08" r="0.64" transform="translate(4.3 176.47) rotate(-89.82)"/>
				<circle class="cls-10" cx="94.22" cy="86.07" r="0.64" transform="translate(7.86 180.03) rotate(-89.82)"/>
			
				<path class="cls-9" d="M80.27,96.59h0a3.56,3.56,0,0,0,1,2.44,3,3,0,0,0,4.54,0,3.6,3.6,0,0,0,.95-2.44V92H80.28v4.62"/>
				<circle class="cls-10" cx="81.74" cy="93.73" r="0.64" transform="translate(-12.24 175.18) rotate(-89.82)"/>
				<circle class="cls-10" cx="85.31" cy="93.73" r="0.64"/>
				<circle class="cls-10" cx="83.52" cy="95.44" r="0.64" transform="translate(-0.3 0.26) rotate(-0.18)"/>
				<circle class="cls-10" cx="81.74" cy="97.24" r="0.64" transform="translate(-15.75 178.68) rotate(-89.82)"/>
				<circle class="cls-10" cx="85.3" cy="97.23" r="0.64" transform="translate(-0.31 0.27) rotate(-0.18)"/>
			
				<path class="cls-9" d="M98.08,96.59h0A3.56,3.56,0,0,0,99,99a3,3,0,0,0,4.54,0,3.56,3.56,0,0,0,1-2.44V92H98.09v4.62"/>
				<circle class="cls-10" cx="99.55" cy="93.73" r="0.64" transform="translate(-0.3 0.32) rotate(-0.18)"/>
				<circle class="cls-10" cx="103.12" cy="93.73" r="0.64" transform="translate(9.07 196.56) rotate(-89.82)"/>
				<circle class="cls-10" cx="101.33" cy="95.44" r="0.64"/>
				<circle class="cls-10" cx="99.55" cy="97.24" r="0.64" transform="translate(-0.3 0.31) rotate(-0.18)"/>
				<circle class="cls-10" cx="103.12" cy="97.23" r="0.64" transform="translate(5.56 200.04) rotate(-89.82)"/>
			
				<path class="cls-9" d="M89.18,107.65h0a3.6,3.6,0,0,0,.95,2.44,3.06,3.06,0,0,0,4.55,0,3.6,3.6,0,0,0,.94-2.45V103H89.2l0,4.62"/>
				<circle class="cls-10" cx="90.66" cy="104.79" r="0.64" transform="translate(-14.41 195.12) rotate(-89.82)"/>
				<circle class="cls-10" cx="94.22" cy="104.79" r="0.64" transform="translate(-10.86 198.69) rotate(-89.82)"/>
				<circle class="cls-10" cx="92.44" cy="106.5" r="0.64"/>
				<circle class="cls-10" cx="90.66" cy="108.3" r="0.64" transform="translate(-17.92 198.62) rotate(-89.82)"/>
				<circle class="cls-10" cx="94.22" cy="108.29" r="0.64" transform="translate(-14.36 202.17) rotate(-89.82)"/>
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<style>
					.a { fill: #060; }
					.b, .e { fill: red; }
					.c, .f, .g, .h { fill: #ff0; }
					.c, .d, .e, .g, .h { stroke: #000; stroke-width: 0.25px; }
					.c { stroke-linecap: round; stroke-linejoin: round; fill-rule: evenodd; }
					.d, .j { fill: #fff; }
					.d, .e, .g { stroke-miterlimit: 6.03; }
					.h { stroke-miterlimit: 6.03; }
					.i { fill: #039; }
				</style>

				<rect class="a" width="92.16" height="256"/>
				<rect class="b" x="92.16" width="163.84" height="256"/>

				<path class="c" d="M138.79,164.58C120.85,164,38.62,112.91,38.06,104.77l4.54-7.54C50.75,109,134.82,158.76,143.08,157l-4.29,7.58"/>
				<path class="c" d="M41.64,96.2C40,100.52,63.1,114.72,90.85,131.54s51.69,27.2,53.46,25.71a14.71,14.71,0,0,0,.8-1.49c-.33.5-1.14.66-2.4.29C130.53,154.34,48.3,107,42.87,96.49a3.39,3.39,0,0,1-.35-1.69h-.08L41.74,96l-.1.19Zm97.57,68.62c-6.27,5.81-108.16-54.7-101.76-60.43l.69-1.2.13,0C36,110,84,137.28,86.77,139c27.74,17.12,51.12,27.11,53.19,24.51l-.75,1.29Z"/>
				<path class="c" d="M92.44,109.7c18-.14,40.1-2.44,52.85-7.5l-2.75-4.44c-7.53,4.15-29.8,6.88-50.25,7.29-24.18-.22-41.25-2.47-49.8-8.18L39.9,101.6c15.72,6.63,31.83,8,52.54,8.1"/>
				<path class="c" d="M146,102.3c-.44.7-8.75,3.56-21,5.66-14.84,2.89-48.78,3-63.92.38-12.86-2-19.49-4.8-22-5.78.24-.47.39-.8.61-1.23A95.62,95.62,0,0,0,61.31,107a231,231,0,0,0,31,2,218.81,218.81,0,0,0,32.42-2.39c12.56-2,19.42-4.62,20.38-5.82l.89,1.52Zm-2.41-4.51c-21.82,10.18-79.7,9.94-102,.38.23-.4.46-.79.71-1.19,20.36,9.3,80.51,9.71,100.38-.64l.87,1.45Z"/>
				<path class="c" d="M33.5,131.25c22.9,12,94,11.83,117.71.41l-.28-5.92c-3.22,5-32.72,9.82-58.89,9.62s-50.48-4.22-58.58-9.43l0,5.31"/>
				<path class="c" d="M151.78,130.39v1.42c-1.55,1.84-11.25,4.62-23.41,6.58-23.61,4.22-76.27,3.51-95.58-6.51v-1.65c24.47,12.66,95.92,12.36,119,.16Zm0-5v1.41c-1.55,1.85-11.24,4.63-23.41,6.59-23.61,4.21-76.27,3.51-95.58-6.52v-1.64c24.49,12.66,95.92,12.35,119,.16Z"/>
				<path class="c" d="M92.22,163.57c-25.39-.15-47.15-6.9-51.74-8l3.35,5.22c8.11,3.4,29.34,8.47,48.63,7.91s36.16-2.05,48-7.81l3.44-5.42c-8.1,3.8-35.66,8.07-51.72,8.11"/>
				<path class="c" d="M141.79,159.66c-.5.77-1,1.53-1.54,2.27a136.93,136.93,0,0,1-18.16,4.64c-24.32,5.5-63.27,1.65-79.41-5.74l-.7-1.19.11-.18,1.19.45c15.4,5.49,32.7,7.68,49.09,8.08a168.76,168.76,0,0,0,29.26-2.69c13.5-2.76,17.83-4.35,20.16-5.64Zm3-4.89,0,0c-.38.63-.77,1.28-1.17,1.92-12.6,4-30,7-51.13,7.47-29.1-.74-47.93-6.41-52.41-7.8l-.66-1.27c16.86,4.38,34.08,7.45,53.07,7.76a196.74,196.74,0,0,0,28-2.4c13.82-2.14,20.78-4.4,22.86-5.06l-.09-.11,1.5-.56Z"/>
				<path class="c" d="M145.07,126.57c-1.19,32.77-23.49,52.56-53.08,53.75-31.53-.95-51.74-25.31-52.31-52.83,1.06-32,26.47-52.31,54.26-52.08,13.27.35,28.77,6.84,39.48,19.71,7,8.44,10.06,17.59,11.65,31.45Zm-52.94-57c32.34,0,58.94,26.21,58.94,58.36-3.45,77.33-114.3,77.54-117.66,0,0-32.15,26.38-58.36,58.72-58.36"/>
				<path class="c" d="M92.29,69.41A58.77,58.77,0,0,1,151.06,128c-3.31,77.68-114.24,77.66-117.55,0A58.78,58.78,0,0,1,92.29,69.41ZM34.81,128c0,31.49,26,57.26,57.48,57.26s57.48-25.77,57.48-57.26-26-57.27-57.48-57.27S34.81,96.47,34.81,128Z"/>
				<path class="c" d="M92.34,74.27c29.52,0,53.83,24.14,53.83,53.64s-24.31,53.63-53.83,53.63S38.5,157.4,38.5,127.91,62.82,74.27,92.34,74.27ZM39.79,127.91c0,28.78,23.74,52.34,52.55,52.34s52.54-23.56,52.54-52.34S121.15,75.56,92.34,75.56,39.79,99.12,39.79,127.91Z"/>
				<path class="c" d="M94.71,69.17h-5V186.82h5.06Z"/>
				<path class="c" d="M94.2,68.5h1.28v119H94.21V68.5Zm-5,0h1.29v119H89.2V68.5Z"/>
				<path class="c" d="M151.1,130.23v-4.35l-3.55-3.3-20.18-5.33-29.09-3-35,1.77L38.32,122l-5,3.71v4.35L46,124.35l30.28-4.73H105.4L126.77,122l14.84,3.54Z"/>
				<path class="c" d="M92.31,118.89c17.42.07,49.54,2.46,59.47,11.41v1.53c-3.2-3.84-13.63-6.65-21.68-8.26-20.94-4.49-55.89-4.28-76.35.07-8.38,1.66-19.56,5-21,8.2v-1.59c7.33-8.46,42.87-11.46,59.53-11.36Zm0-5c17.42.06,49.54,2.46,59.46,11.41v1.52c-3.2-3.83-13.64-6.65-21.68-8.25-20.93-4.49-55.84-4.28-76.29.07-8.09,1.53-19.73,4.95-21,8.2v-1.59c7.64-8.56,42.66-11.41,59.53-11.36Z"/>
				<path class="c" d="M92,88.26c21.88-.11,41,3,49.69,7.5l3.18,5.48c-7.59-4.07-28.17-8.3-52.83-7.67-20.1.12-41.57,2.2-52.35,7.93l3.8-6.33c8.85-4.57,29.7-6.89,48.51-6.91"/>
				<path class="c" d="M92.32,92.79c16.89-.15,41.46,1.7,52.78,7.86l1,1.66C133.27,95.72,110.3,94,92.3,94.12c-18.77-.17-41.15,1.6-52.93,8.08l.93-1.76c13.67-6.66,32.78-7.52,52-7.65h0Zm0-5c17.22.14,37.26.77,50,7.83l1.38,2.18C128,85.86,59.47,86.7,42.78,96.54L44,94.71c13.65-6.15,30.36-6.65,48.33-6.94Z"/>
				<path class="c" d="M121.52,152.3c-27.62-5.64-74.61.11-78.88,7.37l-2.73-4.43C53.59,144,101.66,143.17,124,147.88l-2.51,4.42"/>
				<path class="c" d="M92.09,149.46c10.14.15,20.1.57,29.7,2.35L121.1,153c-20.79-3.46-47.53-3.33-67.88,2.32-3.74,1-9.92,3.43-10.56,5.41L42,159.62c.2-1.17,3.94-3.6,10.93-5.55,13.57-3.87,26.26-4.53,39.19-4.61Zm.46-5.09c10.51.2,21.36.68,31.9,2.76l-.72,1.28c-21.46-3.87-49.67-4.1-71.94,2.05-4.2,1.22-11.46,3.85-11.7,5.94l-.69-1.22c.16-1.9,6.44-4.37,12.08-6,13.12-3.79,27.47-4.77,41.07-4.8Z"/>
				<path class="c" d="M144.33,155.91,140,162.68l-12.58-11.13L94.72,129.67l-36.81-20.1L38.8,103.06l4.08-7.52,1.38-.75,11.87,2.95,39.18,20.11L117.87,132l19,13.6,7.72,8.87Z"/>
				<path class="c" d="M38.12,103.23c6.93-6,105.23,52.47,101.8,60.5l-.73,1.14-.33.27c.07-.06.44-.51,0-1.72-1.34-8.67-93.08-65-101.44-58.77l.74-1.42Zm107.11,52.59c2.12-4.17-20.73-21.31-49-38-29-16.36-49.86-26-53.68-23.11l-.85,1.53c0,.09,0-.1.21-.24a3.79,3.79,0,0,1,2.37-.57C56,95,136.37,138.61,144.45,156.27c0,.58.05.7-.17,1l.95-1.43Z"/>

				<path class="d" d="M56.69,134a35.89,35.89,0,0,0,35.54,35.58A35.66,35.66,0,0,0,127.88,134h0V86.52l-71.2-.09V134Z"/>
				<path class="e" d="M58,134.05v0a33.82,33.82,0,0,0,10.06,24,34.1,34.1,0,0,0,58.24-24h0V88H58.06l0,46m54.58-32.24v29.33l0,3.1h0a21.26,21.26,0,0,1-.15,2.54,19.85,19.85,0,0,1-5.84,11.82,20.41,20.41,0,0,1-34.72-14.46v-32.4l40.74.07Z"/>

				<path class="f" d="M62.44,100.05c.08-3.31,2.43-4.1,2.45-4.11a4.13,4.13,0,0,1,2.53,4.14l-5,0"/>
				<path class="g" d="M60.41,96,60,99.81h2.49c0-3.15,2.38-3.68,2.44-3.67a3.68,3.68,0,0,1,2.45,3.67h2.49L69.42,96l-9,0Z"/>
				<path class="g" d="M59.84,99.83H70a.47.47,0,0,1,0,.93H59.84a.47.47,0,0,1,0-.93Z"/>
				<path class="g" d="M63.53,99.81a2.63,2.63,0,0,1,1.36-2.55,2.66,2.66,0,0,1,1.42,2.55H63.53"/>
				<path class="g" d="M60.05,94.42h9.74a.43.43,0,0,1,0,.85H60.05a.43.43,0,0,1,0-.85Z"/>
				<path class="g" d="M60.26,95.27h9.31a.43.43,0,0,1,0,.85H60.26a.43.43,0,0,1,0-.85Z"/>
				<path class="g" d="M63.27,88.92H64v.52h.54v-.53h.75v.53h.54v-.53h.76v1.21a.31.31,0,0,1-.32.31H63.61a.33.33,0,0,1-.34-.32V88.92Z"/>
				<path class="g" d="M66,90.53l.16,3.87H63.62l.17-3.87H66"/>
				<path class="g" d="M62.89,92.33,63,94.41H60.49l.07-2.08Z"/>
				<path class="g" d="M69.25,92.33l.08,2.08H66.86l.07-2.08Z"/>
				<path class="g" d="M60.11,90.82h.72v.52h.52v-.53h.74v.53h.53v-.53h.73V92a.31.31,0,0,1-.32.31H60.44a.33.33,0,0,1-.33-.31V90.82Z"/>
				<path class="g" d="M66.47,90.82h.72v.52h.52v-.53h.74v.53H69v-.53h.74V92a.3.3,0,0,1-.32.31H66.8a.33.33,0,0,1-.33-.31V90.82Z"/>
				<path d="M64.66,91.76a.26.26,0,1,1,.52,0v.92h-.52v-.92"/>
				<path d="M61.47,93.1a.25.25,0,1,1,.49,0v.71h-.49V93.1"/>
				<path d="M67.85,93.1a.25.25,0,1,1,.49,0v.71h-.49V93.1"/>

				<path class="f" d="M62.44,127.83c.08-3.31,2.43-4.09,2.45-4.11a4.14,4.14,0,0,1,2.53,4.14l-5,0"/>
				<path class="g" d="M60.41,123.79l-.41,3.8h2.49c0-3.15,2.38-3.67,2.44-3.66a3.66,3.66,0,0,1,2.45,3.66h2.49l-.45-3.84-9,0Z"/>
				<path class="g" d="M59.84,127.61H70a.48.48,0,0,1,0,.94H59.84a.48.48,0,0,1,0-.94Z"/>
				<path class="g" d="M63.53,127.59A2.63,2.63,0,0,1,64.89,125a2.66,2.66,0,0,1,1.42,2.55H63.53"/>
				<path class="g" d="M60.05,122.2h9.74a.41.41,0,0,1,.38.43.4.4,0,0,1-.38.42H60.05a.4.4,0,0,1-.37-.42A.41.41,0,0,1,60.05,122.2Z"/>
				<path class="g" d="M60.26,123.06h9.31a.43.43,0,0,1,0,.84H60.26a.43.43,0,0,1,0-.84Z"/>
				<path class="g" d="M63.27,116.7H64v.52h.54v-.54h.75v.53h.54v-.54h.76v1.21a.31.31,0,0,1-.32.31H63.61a.33.33,0,0,1-.34-.31v-1.2Z"/>
				<path class="g" d="M66,118.32l.16,3.87H63.62l.17-3.87H66"/>
				<path class="g" d="M62.89,120.11,63,122.2H60.49l.07-2.09Z"/>
				<path class="g" d="M69.25,120.11l.08,2.09H66.86l.07-2.09Z"/>
				<path class="g" d="M60.11,118.6h.72v.52h.52v-.53h.74v.54h.53v-.54h.73v1.21a.31.31,0,0,1-.32.31H60.44a.33.33,0,0,1-.33-.32V118.6Z"/>
				<path class="g" d="M66.47,118.6h.72v.52h.52v-.53h.74v.54H69v-.54h.74v1.21a.3.3,0,0,1-.32.31H66.8a.33.33,0,0,1-.33-.32V118.6Z"/>
				<path d="M64.66,119.54a.26.26,0,1,1,.52,0v.92h-.52v-.92"/>
				<path d="M61.47,120.88a.25.25,0,1,1,.49,0v.71h-.49v-.71"/>
				<path d="M67.85,120.88a.25.25,0,1,1,.49,0v.71h-.49v-.71"/>

				<path class="f" d="M73.27,156.75c-2.29-2.39-1.19-4.61-1.19-4.63a4.11,4.11,0,0,1,4.72,1.12l-3.53,3.51"/>
				<path class="h" d="M69,155.34l2.42,3,1.75-1.76c-2.22-2.23-.93-4.27-.88-4.31a3.68,3.68,0,0,1,4.33.84l1.75-1.77-3-2.38L69,155.34Z"/>
				<path class="h" d="M71.28,158.44l7.16-7.21a.44.44,0,0,1,.61.05.43.43,0,0,1,0,.61l-7.16,7.21a.42.42,0,0,1-.6,0A.43.43,0,0,1,71.28,158.44Z"/>
				<path class="h" d="M73.87,155.81A2.65,2.65,0,0,1,73,153a2.68,2.68,0,0,1,2.81.8l-2,2"/>
				<path class="h" d="M67.6,154.48l6.86-6.91a.42.42,0,0,1,.6.59l-6.86,6.92a.41.41,0,0,1-.57,0A.4.4,0,0,1,67.6,154.48Z"/>
				<path class="h" d="M68.34,154.94l6.57-6.62a.43.43,0,0,1,.6.6l-6.57,6.61a.4.4,0,0,1-.55,0A.41.41,0,0,1,68.34,154.94Z"/>
				<path class="h" d="M66,148.32l.52-.52.37.37.38-.38-.38-.38.53-.53.38.38.38-.39-.38-.37.53-.54.86.85a.33.33,0,0,1,0,.46l-1.87,1.87a.32.32,0,0,1-.46,0l-.85-.84Z"/>
				<path class="h" d="M69.06,147.49l2.86,2.61-1.83,1.83-2.62-2.85,1.59-1.59"/>
				<path class="h" d="M68.11,151l1.54,1.42-1.75,1.75-1.43-1.52L68.11,151Z"/>
				<path class="h" d="M72.59,146.48l1.54,1.41-1.74,1.76L71,148.13l1.64-1.65Z"/>
				<path class="h" d="M65.08,151.9l.51-.51.37.37.37-.37L66,151l.52-.52.38.38.37-.38-.38-.38.52-.52.85.85a.31.31,0,0,1,0,.45l-1.83,1.84a.33.33,0,0,1-.46,0l-.84-.84Z"/>
				<path class="h" d="M69.56,147.39l.51-.51.37.37.37-.38-.38-.37L71,146l.38.38.37-.37-.38-.38.52-.52.86.85a.3.3,0,0,1,0,.44l-1.82,1.84a.34.34,0,0,1-.46,0l-.85-.84Z"/>
				<path d="M69,149.33a.26.26,0,1,1,.36-.37l.66.65-.37.37-.65-.65"/>
				<path d="M67.65,152.54a.25.25,0,1,1,.35-.35l.51.5-.35.35-.51-.5"/>
				<path d="M72.15,148a.25.25,0,1,1,.35-.35l.5.5-.35.35-.5-.5"/>

				<path class="f" d="M89.85,100.05c.08-3.31,2.43-4.1,2.45-4.11a4.1,4.1,0,0,1,2.53,4.14l-5,0"/>
				<path class="g" d="M87.82,96l-.4,3.81H89.9c0-3.15,2.38-3.68,2.44-3.67a3.68,3.68,0,0,1,2.45,3.67h2.49L96.83,96l-9,0Z"/>
				<path class="g" d="M87.25,99.83H97.41c.51,0,.52.91,0,.93H87.25C86.74,100.74,86.73,99.85,87.25,99.83Z"/>
				<path class="g" d="M90.94,99.81a2.61,2.61,0,0,1,1.37-2.55,2.66,2.66,0,0,1,1.41,2.55H90.94"/>
				<path class="g" d="M87.46,94.42h9.75a.43.43,0,0,1,0,.85H87.46A.43.43,0,0,1,87.46,94.42Z"/>
				<path class="g" d="M87.67,95.27H97c.47,0,.47.83,0,.85H87.67C87.2,96.1,87.19,95.29,87.67,95.27Z"/>
				<path class="g" d="M90.68,88.92h.73v.52H92v-.53h.75v.53h.54v-.53H94v1.21a.32.32,0,0,1-.33.31H91a.33.33,0,0,1-.34-.32V88.92Z"/>
				<path class="g" d="M93.45,90.53l.17,3.87H91l.17-3.87h2.24"/>
				<path class="g" d="M90.3,92.33l.08,2.08H87.91L88,92.33Z"/>
				<path class="g" d="M96.66,92.33l.08,2.08H94.27l.07-2.08Z"/>
				<path class="g" d="M87.52,90.82h.72v.52h.52v-.53h.74v.53H90v-.53h.74V92a.31.31,0,0,1-.33.31H87.86a.33.33,0,0,1-.34-.31V90.82Z"/>
				<path class="g" d="M93.88,90.82h.72v.52h.53v-.53h.73v.53h.53v-.53h.74V92a.31.31,0,0,1-.32.31H94.22a.33.33,0,0,1-.34-.31V90.82Z"/>
				<path d="M92.08,91.76a.26.26,0,1,1,.52,0v.92h-.52v-.92"/>
				<path d="M88.88,93.1a.25.25,0,1,1,.5,0v.71h-.5V93.1"/>
				<path d="M95.26,93.1a.25.25,0,1,1,.5,0v.71h-.5V93.1"/>

				<path class="f" d="M122.05,100.05c-.08-3.31-2.43-4.1-2.45-4.11a4.11,4.11,0,0,0-2.52,4.14l5,0"/>
				<path class="g" d="M124.08,96l.41,3.81H122c0-3.15-2.38-3.68-2.44-3.67a3.68,3.68,0,0,0-2.45,3.67h-2.49l.45-3.84,9,0Z"/>
				<path class="g" d="M124.65,99.83H114.49a.47.47,0,0,0,0,.93h10.16a.47.47,0,0,0,0-.93Z"/>
				<path class="g" d="M121,99.81a2.63,2.63,0,0,0-1.36-2.55,2.66,2.66,0,0,0-1.42,2.55H121"/>
				<path class="g" d="M124.44,94.42H114.7a.43.43,0,0,0,0,.85h9.74a.43.43,0,0,0,0-.85Z"/>
				<path class="g" d="M124.23,95.27h-9.31a.43.43,0,0,0,0,.85h9.31a.43.43,0,0,0,0-.85Z"/>
				<path class="g" d="M121.22,88.92h-.73v.52H120v-.53h-.75v.53h-.54v-.53h-.76v1.21a.31.31,0,0,0,.33.31h2.64a.33.33,0,0,0,.34-.32V88.92Z"/>
				<path class="g" d="M118.45,90.53l-.16,3.87h2.58l-.17-3.87h-2.25"/>
				<path class="g" d="M121.6,92.33l-.08,2.08H124l-.07-2.08Z"/>
				<path class="g" d="M115.24,92.33l-.08,2.08h2.47l-.07-2.08Z"/>
				<path class="g" d="M124.38,90.82h-.72v.52h-.52v-.53h-.74v.53h-.53v-.53h-.73V92a.31.31,0,0,0,.32.31h2.59a.33.33,0,0,0,.33-.31V90.82Z"/>
				<path class="g" d="M118,90.82h-.72v.52h-.52v-.53H116v.53h-.53v-.53h-.74V92a.3.3,0,0,0,.32.31h2.59A.33.33,0,0,0,118,92V90.82Z"/>
				<path d="M119.83,91.76a.26.26,0,1,0-.52,0v.92h.52v-.92"/>
				<path d="M123,93.1a.25.25,0,1,0-.49,0v.71H123V93.1"/>
				<path d="M116.64,93.1a.25.25,0,1,0-.49,0v.71h.49V93.1"/>

				<path class="f" d="M122.05,127.83c-.08-3.31-2.43-4.09-2.45-4.11a4.13,4.13,0,0,0-2.52,4.14l5,0"/>
				<path class="g" d="M124.08,123.79l.41,3.8H122c0-3.15-2.38-3.67-2.44-3.66a3.66,3.66,0,0,0-2.45,3.66h-2.49l.45-3.84,9,0Z"/>
				<path class="g" d="M124.65,127.61H114.49a.48.48,0,0,0,0,.94h10.16a.48.48,0,0,0,0-.94Z"/>
				<path class="g" d="M121,127.59A2.63,2.63,0,0,0,119.6,125a2.66,2.66,0,0,0-1.42,2.55H121"/>
				<path class="g" d="M124.44,122.2H114.7a.41.41,0,0,0-.38.43.4.4,0,0,0,.38.42h9.74a.4.4,0,0,0,.37-.42A.41.41,0,0,0,124.44,122.2Z"/>
				<path class="g" d="M124.23,123.06h-9.31a.42.42,0,0,0,0,.84h9.31a.43.43,0,0,0,0-.84Z"/>
				<path class="g" d="M121.22,116.7h-.73v.52H120v-.54h-.75v.53h-.54v-.54h-.76v1.21a.31.31,0,0,0,.33.31h2.64a.33.33,0,0,0,.34-.31v-1.2Z"/>
				<path class="g" d="M118.45,118.32l-.16,3.87h2.58l-.17-3.87h-2.25"/>
				<path class="g" d="M121.6,120.11l-.08,2.09H124l-.07-2.09Z"/>
				<path class="g" d="M115.24,120.11l-.08,2.09h2.47l-.07-2.09Z"/>
				<path class="g" d="M124.38,118.6h-.72v.52h-.52v-.53h-.74v.54h-.53v-.54h-.73v1.21a.31.31,0,0,0,.32.31h2.59a.33.33,0,0,0,.33-.32V118.6Z"/>
				<path class="g" d="M118,118.6h-.72v.52h-.52v-.53H116v.54h-.53v-.54h-.74v1.21a.3.3,0,0,0,.32.31h2.59a.33.33,0,0,0,.33-.32V118.6Z"/>
				<path d="M119.83,119.54a.26.26,0,1,0-.52,0v.92h.52v-.92"/>
				<path d="M123,120.88a.25.25,0,1,0-.49,0v.71H123v-.71"/>
				<path d="M116.64,120.88a.25.25,0,1,0-.49,0v.71h.49v-.71"/>

				<path class="f" d="M111.22,156.75c2.29-2.39,1.19-4.61,1.19-4.63a4.11,4.11,0,0,0-4.72,1.12l3.53,3.51"/>
				<path class="h" d="M115.52,155.34l-2.42,3-1.75-1.76c2.22-2.23.93-4.27.88-4.31a3.68,3.68,0,0,0-4.33.84l-1.75-1.77,3-2.38,6.33,6.41Z"/>
				<path class="h" d="M113.21,158.44l-7.16-7.21a.44.44,0,0,0-.61.05.43.43,0,0,0,0,.61l7.16,7.21a.42.42,0,0,0,.6,0A.43.43,0,0,0,113.21,158.44Z"/>
				<path class="h" d="M110.62,155.81a2.65,2.65,0,0,0,.85-2.77,2.68,2.68,0,0,0-2.81.8l2,2"/>
				<path class="h" d="M116.89,154.48,110,147.57a.42.42,0,0,0-.6.59l6.86,6.92a.41.41,0,0,0,.57,0A.4.4,0,0,0,116.89,154.48Z"/>
				<path class="h" d="M116.15,154.94l-6.57-6.62a.43.43,0,0,0-.6.6l6.57,6.61a.4.4,0,0,0,.55,0A.41.41,0,0,0,116.15,154.94Z"/>
				<path class="h" d="M118.53,148.32l-.52-.52-.37.37-.38-.38.38-.38-.53-.53-.38.38-.38-.39.38-.37-.53-.54-.86.85a.33.33,0,0,0,0,.46l1.87,1.87a.32.32,0,0,0,.46,0l.85-.84Z"/>
				<path class="h" d="M115.43,147.49l-2.86,2.61,1.83,1.83,2.62-2.85-1.59-1.59"/>
				<path class="h" d="M116.38,151l-1.54,1.42,1.75,1.75,1.43-1.52L116.38,151Z"/>
				<path class="h" d="M111.9,146.48l-1.54,1.41,1.74,1.76,1.44-1.52-1.64-1.65Z"/>
				<path class="h" d="M119.41,151.9l-.51-.51-.37.37-.37-.37.38-.38-.52-.52-.38.38-.37-.38.38-.38-.52-.52-.85.85a.31.31,0,0,0,0,.45l1.83,1.84a.33.33,0,0,0,.46,0l.84-.84Z"/>
				<path class="h" d="M114.93,147.39l-.51-.51-.37.37-.37-.38.38-.37-.52-.53-.38.38-.37-.37.38-.38-.52-.52-.86.85a.3.3,0,0,0,0,.44l1.82,1.84a.34.34,0,0,0,.46,0l.85-.84Z"/>
				<path d="M115.53,149.33a.26.26,0,1,0-.36-.37l-.66.65.37.37.65-.65"/>
				<path d="M116.84,152.54a.25.25,0,1,0-.35-.35l-.51.5.35.35.51-.5"/>
				<path d="M112.34,148a.25.25,0,1,0-.35-.35l-.5.5.35.35.5-.5"/>

				<path class="i" d="M87.89,128.82h0a5,5,0,0,0,1.33,3.41,4.26,4.26,0,0,0,6.36,0,5.05,5.05,0,0,0,1.32-3.42v-6.46h-9l0,6.45"/>
				<circle class="j" cx="89.95" cy="124.82" r="0.89" transform="translate(-35.15 214.39) rotate(-89.82)"/>
				<circle class="j" cx="94.94" cy="124.83" r="0.89" transform="translate(-30.18 219.38) rotate(-89.82)"/>
				<circle class="j" cx="92.44" cy="127.22" r="0.89"/>
				<circle class="j" cx="89.95" cy="129.73" r="0.89" transform="translate(-40.05 219.29) rotate(-89.82)"/>
				<circle class="j" cx="94.94" cy="129.72" r="0.89" transform="translate(-35.08 224.25) rotate(-89.82)"/>

				<path class="i" d="M87.89,113.22h0a5,5,0,0,0,1.33,3.42,4.27,4.27,0,0,0,6.36,0,5,5,0,0,0,1.32-3.41v-6.46h-9l0,6.46"/>
				<circle class="j" cx="89.95" cy="109.22" r="0.89" transform="translate(-19.54 198.83) rotate(-89.82)"/>
				<circle class="j" cx="94.94" cy="109.22" r="0.89" transform="translate(-14.57 203.83) rotate(-89.82)"/>
				<circle class="j" cx="92.44" cy="111.62" r="0.89"/>
				<circle class="j" cx="89.95" cy="114.13" r="0.89" transform="translate(-24.45 203.72) rotate(-89.82)"/>
				<circle class="j" cx="94.94" cy="114.12" r="0.89" transform="translate(-19.47 208.7) rotate(-89.82)"/>

				<path class="i" d="M75.42,128.82h0a5,5,0,0,0,1.33,3.41,4.32,4.32,0,0,0,3.18,1.43,4.37,4.37,0,0,0,3.18-1.42,5.05,5.05,0,0,0,1.32-3.42v-6.46h-9l0,6.45"/>
				<circle class="j" cx="77.48" cy="124.82" r="0.89" transform="translate(-47.58 201.91) rotate(-89.82)"/>
				<circle class="j" cx="82.47" cy="124.83" r="0.89"/>
				<circle class="j" cx="79.97" cy="127.22" r="0.89" transform="translate(-0.39 0.25) rotate(-0.18)"/>
				<circle class="j" cx="77.48" cy="129.73" r="0.89" transform="translate(-52.49 206.81) rotate(-89.82)"/>
				<circle class="j" cx="82.46" cy="129.72" r="0.89" transform="translate(-0.41 0.26) rotate(-0.18)"/>

				<path class="i" d="M100.33,128.82h0a5,5,0,0,0,1.33,3.41,4.26,4.26,0,0,0,6.36,0,5.05,5.05,0,0,0,1.32-3.42v-6.46h-9l0,6.45"/>
				<circle class="j" cx="102.39" cy="124.82" r="0.89" transform="translate(-0.39 0.32) rotate(-0.18)"/>
				<circle class="j" cx="107.38" cy="124.83" r="0.89" transform="translate(-17.78 231.82) rotate(-89.82)"/>
				<circle class="j" cx="104.88" cy="127.22" r="0.89"/>
				<circle class="j" cx="102.39" cy="129.73" r="0.89" transform="translate(-0.4 0.32) rotate(-0.18)"/>
				<circle class="j" cx="107.38" cy="129.72" r="0.89" transform="translate(-22.68 236.69) rotate(-89.82)"/>

				<path class="i" d="M87.89,144.29h0a5,5,0,0,0,1.33,3.42,4.27,4.27,0,0,0,6.36,0,5,5,0,0,0,1.32-3.41v-6.46h-9l0,6.46"/>
				<circle class="j" cx="89.95" cy="140.29" r="0.89" transform="matrix(0, -1, 1, 0, -50.61, 229.81)"/>
				<circle class="j" cx="94.94" cy="140.29" r="0.89" transform="translate(-45.65 234.8) rotate(-89.82)"/>
				<circle class="j" cx="92.44" cy="142.69" r="0.89"/>
				<circle class="j" cx="89.95" cy="145.2" r="0.89" transform="translate(-55.52 234.7) rotate(-89.82)"/>
				<circle class="j" cx="94.94" cy="145.19" r="0.89" transform="translate(-50.55 239.67) rotate(-89.82)"/>
			</svg>
		`;
}