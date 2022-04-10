
import { iit_college_data } from "../iit_college_data.js";
import { nit_and_iiit_college_data } from "../nit_and_iiit_college_data.js";

let ids = [
    "college_name",
    "youtube_link",
    "avg_salary",
    "median_salary",
    "highest_salary",
    "placement_ratio",
    "railway_distance",
    "railway_name",
    "airport_distance",
    "airport_name",
    "campus_area",
    "fees",
];

let query = window.location.search.slice(1).split('&').map(x => x.split("=")).reduce((merged,x) => {
    merged[x[0]] = x[1];
    return merged;
}, {});

let college_data = query.type == 'iit' ? iit_college_data : nit_and_iiit_college_data;

ids.forEach(x => {
    document.getElementById(x).innerHTML = college_data[query.id][x];
});

document.title = `${college_data[query.id].college_name} | College Info | JoSAA Counselor`
