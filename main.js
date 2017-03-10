
const runTasks = () => {
    var prevDayTasks = getTasks('#iPreviousDay')
    
    
    console.log(prevDayTasks)

    $('.js-new-time-entry-container').append(getPrevDayDiv(prevDayTasks))
}

const getPrevDayDiv = (prevDayTasks) => {
 return (
     $('<div id="prev-day-entries"></div>').append(buildPrevDayUl(prevDayTasks)).append(getPrevDayButton())
 )
}

const getPrevDayButton = () => {
    return ($('<button id="btn-yesterday-tasks"></button>')
        
        .on('click', () => {$('#prev-day-entries ul').toggle()})
        .addClass('button button-primary button-new button-icon-only do-not-print')
        .append('<span class="text">Previous Day</span>')
         )
        
}

const buildPrevDayUl = (prevDayTasks) => {
    
    let ul = $('<ul></ul>')
    prevDayTasks.forEach( (item) => ul.append(buildPrevDayLi(item)) )
    return ul
}

const buildPrevDayLi = (item) => {
    let li = $( `<li>
                <span>${item.project}</span>&nbsp;<span>${item.client}</span>
                <span>${item.task}</span>
                <span>${item.notes}</span>
                </li>`)
    li.data('item', item)
    li.click(function() {
        console.log($(this).data('item'))
        console.log($(this))
    })
    return li
}

const getTasks = (selector) => {
    var tasks = []
    $(selector).contents().find('.day-view-entry-list li').each((index, li) => { 
        var $timeEntry = $(li)
        
        let getEntryText = (selector) => $timeEntry.find(selector).text().trim()

        tasks = [
            ...tasks,
            {
                project: getEntryText('.project'),
                client: getEntryText('.client'),
                task: getEntryText('.task'),
                notes: getEntryText('.notes')
            }
        ]
    })
    return tasks
}



$('<iframe src="https://printiq.harvestapp.com/time/day/2017/03/09/1178822" id="iPreviousDay" />')
    .appendTo('body')
    .bind('load', runTasks)