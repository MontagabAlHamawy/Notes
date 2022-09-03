let input = document.querySelector( ".in" );
let submit = document.querySelector( ".p" );
let tasksdiv = document.querySelector( ".co" );


let arrayofatasks = [];

if ( localStorage.getItem( "tasks" ) )
{
    arrayofatasks = JSON.parse( localStorage.getItem( "tasks" ) );
}

getdate();

submit.onclick = function ()
{
    if ( input.value !== '' )
    {
        addTaskToArrey( input.value );
        input.value = "";
    }
};

tasksdiv.addEventListener( "click", ( e ) =>
{
    if ( e.target.classList.contains( "p3" ) )
    {
        delettaskw( e.target.parentElement.getAttribute( "data-id" ) );
        e.target.parentElement.remove();
    }
    if ( e.target.classList.contains( "conte" ) )
    {
        torrlw( e.target.getAttribute( "data-id" ) )
        e.target.classList.toggle( "done" );
    }
} )

function addTaskToArrey ( tasktext )
{
    const task = {
        id: Date.now(),
        title: tasktext,
        completed: false,
    };
    arrayofatasks.push( task );

    addElementstopagefrom( arrayofatasks );

    addDeta( arrayofatasks );
};
function addElementstopagefrom ( arrayofatasks )
{

    arrayofatasks.forEach( ( task ) =>
    {
        tasksdiv.innerHTML = ""
        let div = document.createElement( "div" );
        div.className = "conte";
        if ( task.completed )
        {
            div.className = "conte done";
        }
        div.setAttribute( "data-id", task.id );
        let pp = document.createElement( "p" );
        pp.appendChild( document.createTextNode( task.title ) );
        pp.className = "p2";
        div.appendChild( pp );
        let span = document.createElement( "p" );
        span.className = "p3";
        span.appendChild( document.createTextNode( "delete" ) );
        div.appendChild( span );
        tasksdiv.appendChild( div );
    } )
}
function addDeta ()
{
    window.localStorage.setItem( "tasks", JSON.stringify( arrayofatasks ) );

}
function getdate ()
{
    let data = window.localStorage.getItem( "tasks" );
    if ( data )
    {
        let tasks = JSON.parse( data );
        addElementstopagefrom( tasks );
    }

}
function delettaskw ( taskid )
{
    arrayofatasks = arrayofatasks.filter( ( task ) => task.id != taskid );
    addDeta( arrayofatasks );
}
function torrlw ( taskid )
{
    for ( let i = 0; i < arrayofatasks.length; i++ )
    {
        if ( arrayofatasks[ i ].id == taskid )
        {
            arrayofatasks[ i ].completed == false ? ( arrayofatasks[ i ].completed = true ) : ( arrayofatasks[ i ].completed = false );
        }
    }
    addDeta( arrayofatasks );
}