// namespace
namespace cf {
	// interface

	export interface TouchVector2d{
		x: number,
		y: number,
		touches: Array<any>,
	}

	// class
	export class Helpers {
		public static lerp(norm: number, min: number, max: number): number {
			return (max - min) * norm + min;
		}

		public static norm(value: number, min: number, max: number): number {
			return (value - min) / (max - min);
		}

		public static getXYFromMouseTouchEvent (event: Event | MouseEvent | TouchEvent): TouchVector2d {
			var touches: Array<any> = null;
			if((<any> event).originalEvent)
				touches = (<any> event).originalEvent.touches || (<any> event).originalEvent.changedTouches;
			else if((<TouchEvent> event).changedTouches)
				touches = Array <any> ((<TouchEvent> event).changedTouches);

			if(touches){
				return {x: touches[0].pageX, y: touches[0].pageY, touches: touches[0]};
			}else{
				return {x: (<MouseEvent> event).pageX, y: (<MouseEvent> event).pageY, touches: null};
			}
		}

		public static getInnerTextOfElement(element: HTMLElement): string {
			var tmp = document.createElement("DIV");
			tmp.innerHTML = element.innerHTML;
			return tmp.textContent || tmp.innerText || "";
		}

		public static getMouseEvent(eventString: string): string{
			let mappings: any = [];
			mappings["mousedown"] = "ontouchstart" in window ? "touchstart" : "mousedown";
			mappings["mouseup"] = "ontouchstart" in window ? "touchend" : "mouseup";
			mappings["mousemove"] = "ontouchstart" in window ? "touchmove" : "mousemove";

			return <string> mappings[eventString];
		}

		public static caniuse = {
			fileReader: () => {
				if((<any>window).File && (<any>window).FileReader && (<any>window).FileList && window.Blob)
					return true;
				
				return false;
			}
		}

		public static setTransform(el: any, transformString: string){
			el.style["-webkit-transform"] = transformString;
			el.style["-moz-transform"] = transformString;
			el.style["-ms-transform"] = transformString;
			el.style["transform"] = transformString;
		}
	}
}
