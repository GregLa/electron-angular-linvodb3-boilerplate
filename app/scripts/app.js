(function(){

    'use strict';

    angular.module('app', [])
        .service('appService', ['$q', AppService]) // Use Q for amazing promises
        .controller('appController', ['$scope','appService', AppController]);

    function AppService($q){

        return {
            getNotes: getNotes,
            addNote: addNote,
            deleteNote: deleteNote
        };

        function getNotes(){
            var deferred = $q.defer();

            Notes.find({},function(err, notes){
                if (err) deferred.reject(err);
                deferred.resolve(notes);
            });

            return deferred.promise;
        }

        function addNote(text){
            var deferred = $q.defer();

            var note = new Notes();
            note.text = text;

            Notes.insert(note, function(err, newNote){
                if (err) deferred.reject(err);
                deferred.resolve(newNote);
            });

            return deferred.promise;
        }

        function deleteNote(id){
            var deferred = $q.defer();

            Notes.remove({_id: id}, function(err, numRemoved){
                if (err) deferred.reject(err);
                deferred.resolve(numRemoved);
            });

            return deferred.promise;
        }
    }

    function AppController($scope, noteService){

        $scope.note = { text : ''};
        $scope.notes = [];

        $scope.getAllNotes = function(){
            noteService.getNotes().then(function(notes){
                $scope.notes = notes;
            });
        };

        $scope.addNote = function(){
            noteService.addNote($scope.note.text).then(function(newNote){
                $scope.note.text = '';
                $scope.getAllNotes();
            });
        };

        $scope.deleteNote = function(ev, id){
            noteService.deleteNote(id).then(function(numReplaced){
                $scope.getAllNotes();
            });
        };

        // Load initial data
        $scope.getAllNotes();
    }

})();