// import Vue from 'vue'

// export default {
//     strict: true,
//     state: {
//         cues: []
//     },
//     getters: {
//         getCues(state) {
//             return state.cues;
//         },
//         getCue: state => index => {
//             console.log(state.cues)
//             let q =  state.cues.find(element => element.id = index);
//             return q;
//         }

//     },
//     mutations: {
//         SET_CUES(state, cues) {
//             state.cues = cues;
//         }

//     },
//     actions: {
        // setCues(context) {
        //     let ret_cue = [];
        //     Vue.http.get('https://opentdb.com/api.php?amount=10')
        //     .then(res => res.json())
        //     .then(json =>  {
        //         for(let k=0; k<json.results.length; k++) {
        //         ret_cue[k] = json.results[k];
        //         let a = [...json.results[k].incorrect_answers, json.results[k].correct_answer];
        //         for (let i = a.length - 1; i > 0; i--) {
        //             const j = Math.floor(Math.random() * (i + 1));
        //             [a[i], a[j]] = [a[j], a[i]];
        //         }
        //         ret_cue[k].options = a;
        //         ret_cue[k].id = k;
        //     }
        //     });
            
        //     context.commit('SET_CUES', ret_cue);
        // }
        
//     }

// }