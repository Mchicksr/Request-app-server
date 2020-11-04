const xss = require('xss')

const songsServices = {
    getAllSongs(db) {
        return db
        .select('*')
        .from('songs')
    },

    getById(db,id){
        return songsServices.getAllSongs(db)
        .where('id', id)
        .first()
    },

    insertSong(db, newSong){
        return db
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

    deleteSong(db, id) {
        return db('songs')
        .where({ id })
        .delete()
    }
}



module.exports = songsServices;