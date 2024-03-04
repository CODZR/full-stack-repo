import type { AnyAction } from 'redux';

interface EffectsCommandMap {
	put: <A extends AnyAction>(action: A) => any;
	call: Function;
	select: Function;
	take: Function;
	cancel: Function;
	[key: string]: any;
}
interface Action<T = any> {
	type: T;
}
type Reducer<S = any, A extends Action = AnyAction> = (state: S | undefined, action: A) => S;
type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;
