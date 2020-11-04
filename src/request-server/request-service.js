const xss = require('xss')

const songsServices = {
    getAllSongs(knex) {
        return knex
        .select('*')
        .from('songs')
    },

    getById(knex,id){
        return songsServices.getAllSongs(knex)
        .where('id', id)
        .first()
    },

    insertSong(knex, newSong){
        return knex
        .insert(newSong)
        .into('songs')
        .returning('*')
        .then(item =>
            item[0])
    },

    serializeSong(song) {
       return {
           id: song.id,
           name: xss(song.name),
           title: xss(song.title),
           artist: xss(song.artist),
           comment: xss(song.comment) 

       } 
    },

    deleteSong(knex, id) {
        return knex('songs')
        .where({ id })
        .delete()
    }
}



module.exports = songsServices;