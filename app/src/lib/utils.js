import { toastStore } from '@brainandbones/skeleton';

export function errorToast(message) {
	const t = {
		message,
		autohide: true,
		timeout: 5000,
		classes: 'bg-rose-500 font-bold'
	};
	toastStore.trigger(t);
}
export function triggerToast(message) {
	const t = {
		message,
		autohide: true,
		timeout: 5000,
		classes: 'font-bold'
	};
	toastStore.trigger(t);
}
