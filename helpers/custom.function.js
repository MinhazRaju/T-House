import moment from 'moment'

exports.getDate = (createdAt , format) =>{

    return moment(createdAt).format(format)
}


exports.select = function (selected, options){
    
    return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$&selected="selected"');
}





