import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// leaders
export const fetchLeaders = () => (dispatch: any) => {
    dispatch(leadersLoading());
    return fetch(baseUrl + 'leaders')
        .then(async response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.message = await response.json();
                throw error;
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response =>
            response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
};

// export const fetchLeaders = () => async (dispatch: any) => {
//     dispatch(leadersLoading());
//     try {
//         let request = await fetch(baseUrl + 'leaders');
//         if (request.ok) {
//             let respone = await request.json()
//             dispatch(addLeaders(respone))
//         } else {
//             throw new Error("Bad Request");
//         }
//     } catch (error) {
//         if (error) {
//             dispatch(leadersFailed(error));
//         } else {
//             dispatch(leadersFailed("Loading Fail 🤕"))

//         }
//     }
// };
export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});
export const leadersFailed = (errmess: any) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});
export const addLeaders = (leaders: any) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});


export const fetchDishes = () => (dispatch: any) => {
    dispatch(dishesLoading());
    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.message = response.toString();
                throw error;
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
};
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});
export const dishesFailed = (errmess: any) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});
export const addDishes = (dishes: any) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

// comments
export const fetchComments = () => (dispatch: any) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.message = response.toString();
                throw error;
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};
export const commentsFailed = (errmess: any) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});
export const addComments = (comments: any) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


// promotions
export const fetchPromos = () => (dispatch: any) => {
    dispatch(promosLoading());
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.message = response.toString();
                throw error;
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
};
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});
export const promosFailed = (errmess: any) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});
export const addPromos = (promos: any) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});


export const postFavorite = (dishId: number) => (dispatch: any) => {
    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 2000);
};
export const addFavorite = (dishId: number) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});