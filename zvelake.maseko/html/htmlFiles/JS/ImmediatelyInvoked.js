(function (){
    var query = "CREATE DATABASE SummerPracticals;";
    query += "CREATE TABLE Participants(";
    var headings = [
        "name varchar", "GroupNumber integer", "CourseYear integer"
    ];

    for(var col of headings){
        query += col + ",";
    }
    query = query.substring(0, query.length - 1);
    query += ");";
    console.log(query);
})();