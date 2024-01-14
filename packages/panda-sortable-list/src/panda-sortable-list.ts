import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('panda-sortable-list')
export class PandaSortableList extends LitElement {
	@property({ type: Array }) items: any[] = [];

	static styles = css`
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
		}

		li {
			padding: 10px;
			border: 1px solid #ddd;
			margin-bottom: 5px;
			cursor: grab;
		}

		li.dragging {
			opacity: 0.5;
		}
	`;

	render() {
		return html`
		<ul @dragover=${this.handleDragOver} @drop=${this.handleDrop}>
			${this.items.map(
			(item) => html`<li draggable="true" @dragstart=${(e: any) => this.handleDragStart(e, item.id)}>${item.template}</li>`
			)}
		</ul>
		`;
	}

	handleDragStart(event: any, id: string) {
		event.dataTransfer.setData('text/plain', id);
		event.target.classList.add('dragging');
	}

	handleDragOver(event: any) {
		event.preventDefault();
	}

	handleDrop(event: any) {
		event.preventDefault();
		const draggedId = parseInt(event.dataTransfer.getData('text/plain'));
		const droppedId = this.calculateDroppedId(event.clientY);

		// Move the dragged item to the new position
		const draggedItem = this.items.find((item) => item.id === draggedId);
		const droppedIndex = this.items.findIndex((item) => item.id === droppedId);

		this.items.splice(droppedIndex, 0, this.items.splice(this.items.indexOf(draggedItem), 1)[0]);

		this.requestUpdate();
		this.clearDragStyles();
	}

	calculateDroppedId(clientY: any) {
		const rect = this.getBoundingClientRect();
		const offsetY = clientY - rect.top;
		const itemHeight = this.offsetHeight / this.items.length;
		const droppedIndex = Math.round(offsetY / itemHeight);
		return this.items[droppedIndex]?.id;
	}

	clearDragStyles() {
		const draggingElement = this.shadowRoot?.querySelector('.dragging');
		if (draggingElement) {
		draggingElement.classList.remove('dragging');
		}
	}
};
