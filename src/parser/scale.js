define([
    "underscore",
    "core",
    "utils/dataframe"
], function(_, core, Df){
    return [
        "scale",
        /* args: {data_id: "uuid", column: "hoge", range: []} */
        ["domain", "range", "type"],
        {},
        function(domain, range, type){
            return (d3.scale[type])().domain(domain).range(range);
        }
    ];
});
