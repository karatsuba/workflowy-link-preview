const mutationsObserveToggle = (payload: any) => { 
    return {
        type: 'MUTATION_OBSERVER__TOGGLE',
        payload
    }
};

export default {
    mutationsObserveToggle
};
