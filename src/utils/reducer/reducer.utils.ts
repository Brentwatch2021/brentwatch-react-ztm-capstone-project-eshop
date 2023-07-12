 import { AnyAction } from 'redux';

// type Human = {
//     name:string;
// }

// type Alien = {
//     teleport:string;
// }

// // Intersection Types
// type Hybrid = Human & Alien;

// const josh:Hybrid = {
//     speak:,

    
// }


 type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
 }

 /***
  * <AC extends () => AnyAction & { type: string } ACTION type below
  * <AC extends ( ...args: any[] ) => AnyAction & { type: string }> ACTIONWITHPAYLOAD type below
  * we might receieve action creator with or without paramaters.
  * 
  * (actionCreator: AC)
  * We will always recieve some kind of action creator function that is of type the AC generic
  * 
  * And it will return a Matchable type of AC
  * 
  * ...args the one place we can cast as any as it can be anything
  * 
  * 
  * **/
 export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;
 export function withMatcher<AC extends ( ...args: any[] ) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>

 /**
  * It will receive a generic type of Function above is the safeguards  and the type overloading
  * 
  * It gets the type value we know we can get the type becuase the action creator functions 
  * above from the AnyAction type const type = actionCreator().type;
  * 
  * It will assign the actionCretor to a new object and 
  * action is ReturnType<AC>; will use typeNarrowing using 
  * the Return
  * 
  * The main goal of this withMatcher is to extract the type coming off this actionCreator
  */
 export function withMatcher(actionCreator: Function)
 {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction)
        {
            return action.type === type;
        }
    })
 }
 
 /**
 * The ActionWithPayload will come with a payload to create narrow typing.
 *
 * @template T The action enum Type been a string.
 * @template P Payload for the Action.
 */
 export type ActionWithPayload<T, P> = {
    type: T;
    payload:P;
 }


 /**
 * This action will not come with a payload, 
 * and the reason we are not adding an optional 
 * parameter to the ActionWithPayload is that we don't 
 * want to allow an undefined value to be passed to the 
 * action or saga. In such cases, we don't want the receiver 
 * to expect a payload or check for its presence. Instead, 
 * it should recognize it as an action without a payload 
 * and execute accordingly
 *
 * @template T The action enum Type.
 */
 export type Action<T> =
 {
    type: T,
 }

 
 export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T,P>

 // If the payload is void I.E undefined it returns an Action
 export function createAction<T extends string>(type: T, payload: void) : Action<T>;

 export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload }
 }