var _ = require('lodash');
var memoryDb = {
    "data": [
      {
        "description": "Test for 5",
        "severity": "Critical",
        "status": "Closed",
        "created_date": "2018-11-26",
        "resolved_date": "2018-11-28",
        "id": "1"
      },
      {
        "description": "Test for trial",
        "severity": "Minor",        
        "status": "Open",
        "created_date": "2018-11-20",
        "resolved_date": "2018-11-28",
        "id": "2"
      }
    ]
  };
var id = 0;

var list = function () {
    return memoryDb;
};

var add = function (item) {
    var lastItemId;
    if(memoryDb.data.length > 0){
        lastItemId = memoryDb.data[memoryDb.data.length - 1].id;
    }else{
        lastItemId = id;
    }    
    id = ""+Number(lastItemId) + 1;
    item.id = id;
    memoryDb.data.push(item);
};

var getById = function (_id) {
    var currentElem = _.filter(memoryDb.data, function(o) {
      return o.id == _id;
    });
    return currentElem[0];
};

var update = function (item) {
    console.log("item======>", item)
    var index = _.findIndex(memoryDb.data, {id: item.id});
    
    // Replace item at index using native splice
    memoryDb.data.splice(index, 1, item);
};

var remove = function (_id) {
    _.remove(memoryDb.data, function(_item){
        return _item.id == _id;
    });
}; 
exports.list = list;
exports.memoryDb = memoryDb;
exports.add = add;
exports.update = update;
exports.getById = getById;
exports.remove = remove;