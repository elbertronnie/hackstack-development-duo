
import { iit_college_data } from '../iit_college_data.js';

let gender_radios = document.getElementsByName('gender');
let stream_select = document.getElementById('stream-select');
let rank_input = document.getElementById('rank-input');
let sort_by_select = document.getElementById('sort-by-select');
let college_list_div = document.getElementById('college-list');
 
// TODO: Onboarding process - tooltip redirect to how to use page
// TODO: Change placement statistics with average salary
// TODO: Use the first and last seector in tailwind to fix the list border

let i = 0;
for(let data of iit_college_data){
    data.college_id = i;
    i++;
}

function update_list(){
    
    let gender = Array.from(gender_radios).filter(x => x.checked)[0].value;
    let stream = stream_select.value;
    let rank = +rank_input.value;
    let sort_by = sort_by_select.value;
    
    let college_list = iit_college_data.filter(x => x[stream][gender]?.close > rank);

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
    
    let compare_func = sort_by === 'close' ?        x => x[stream][gender].close : 
                       sort_by === 'placement' ?    x => -x.placement : 
                                                    x => x[sort_by];

    college_list.sort(compareBy(compare_func));

    let html_string = "";

    for(let data of college_list){
        html_string += `<a href="college_info.html?type=iit&id=${data.college_id}" target="_blank" class="
                            block 
                            px-4 py-2 
                            border-b border-gray-200 
                            w-full 
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
stream_select.addEventListener('change', update_list);
rank_input.addEventListener('input', update_list);
sort_by_select.addEventListener('change', update_list);

update_list()
