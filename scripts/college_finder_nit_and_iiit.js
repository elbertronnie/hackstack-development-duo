
import { nit_and_iiit_college_data } from '../nit_and_iiit_college_data.js';

let gender_radios = document.getElementsByName('gender');
let state_select = document.getElementById('state-select');
let stream_select = document.getElementById('stream-select');
let rank_input = document.getElementById('rank-input');
let sort_by_select = document.getElementById('sort-by-select');
let college_list_div = document.getElementById('college-list');

let i = 0;
for(let data of nit_and_iiit_college_data){
    data.college_id = i;
    i++;
}

function update_list(){
    
    let gender = Array.from(gender_radios).filter(x => x.checked)[0].value;
    let state = state_select.value;
    let stream = stream_select.value;
    let rank = +rank_input.value;
    let sort_by = sort_by_select.value;

    let college_list = nit_and_iiit_college_data.filter(x => x.type == 'nit' ? x?.[stream]?.[state == x.state ? 'home_state' : 'other_state']?.[gender]?.close > rank 
                                                                             : x?.[stream]?.[gender]?.close > rank);

    let compareBy = map_func => (a, b) => {
        a = map_func(a);
        b = map_func(b);
        if(a > b){
            return 1;
        } else if(a < b){
            return -1;
        } else {
            return 0;
        }
    }

    let compare_func = sort_by === 'close' ?        x => x.type == 'nit' ? x[stream][state == x.state ? 'home_state' : 'other_state'][gender].close : x[stream][gender].close : 
                       sort_by === 'placement' ?    x => -x['placement'] :
                                                    x => x[sort_by];
    
    college_list.sort(compareBy(compare_func));

    let html_string = "";

    for(let data of college_list){
        html_string += `<a href="/college_info.html?id=${data.college_id}" class="
                            block 
                            px-4 py-2 
                            border-b border-gray-200 
                            w-full 
                            first:rounded-t-lg last:rounded-b-lg 
                            hover:bg-gray-100 hover:text-orange-500 
                            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:text-orange-500 
                            cursor-pointer
                        ">
                            ${data.college_name}
                        </a>`;
    }
    college_list_div.innerHTML = html_string;
}

for(let gender_radio of gender_radios){
    gender_radio.addEventListener('change', update_list);
}
state_select.addEventListener('change', update_list);
stream_select.addEventListener('change', update_list);
rank_input.addEventListener('input', update_list);
sort_by_select.addEventListener('change', update_list);

update_list()
