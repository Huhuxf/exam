require('babel-polyfill');
var allSubjectDB = require('./allSubjectDB');
var corretChoices=[0,0,0,1];
var choiceContent=[1,1,1,1];
corretChoices.forEach(function(item,index){
   allSubjectDB.saveChoiceContent(choiceContent[index],item,22).then(function(data){
	console.log(data);
   }).catch(function(err){
	console.log(err);
   })
});