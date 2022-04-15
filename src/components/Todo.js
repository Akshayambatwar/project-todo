import React, { useEffect, useState } from 'react';
import { message, Modal } from 'antd';
import "../App.css";


const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    const time = null;
    const [ctime, setDate] = useState(time);
    const [status, setStatus] = useState('all');
    const [filteredTodos, setFilteredTodos] = useState([]);
    
    const addItem = () => {


        if (!inputData) {
            {
                message.error('Please Add Task')
            }
        } else if (inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);

            setInputData('');

            setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), completed: false, name: inputData }
            setItems([...items, allInputData]);
            setInputData('');
            let time = new Date().toDateString();
            setDate(time);
        }
    }


    // delete the tasks
    const deleteItem = (index) => {
        Modal.confirm({
            title:'Are you sure, you want to delete the task..?',
            okText:'Yes',
            onOk:()=>{
                const updateditems = items.filter((elem) => {
                    return index !== elem.id;
                });
        
                setItems(updateditems);
            }
        })
        
    }

    // edit the item
    

    // 1: get the id and name of the data which user clicked to edit
    // 2: set the toggle mode to change the submit button into edit button
    // 3: Now update the value of the setInput with the new updated value to edit. 
    // 4: To pass the current element Id to new state variable for reference 


    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);

    }
    //changes status of the task
    const completeItem = (id) => {
        setItems(items.map((item) => {
            if (item.id === id) {
                return {
                    ...item, completed: !item.completed,
                };
            } return item;
        }))
    }

    useEffect(() => {
        filterHandler();
    }, [items, status])

    //for filter the data as completed or uncompleted
    const filterHandler = () => {
        switch (status) {
            case 'completed':
                setFilteredTodos(items.filter(todo => todo.completed === true));
                break;
            case 'uncompleted':
                setFilteredTodos(items.filter(todo => todo.completed === false));
                break;
            default:
                setFilteredTodos(items);
                break;
        }
    }
    const statusHandler = (e) => {
        setStatus(e.target.value)
    }
    // remove or delete all task 
    const removeAll = () => {
        Modal.confirm({
            title:'Are you sure, you want to delete all items..?',
            okText:'Yes',
            onOk:()=>{
                setItems([]);
            }
        })
    }



    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <h3 className='Title'>What's the Plan for Today..?</h3>
                   <br/>
                    {/* Add todo task */}
                    <div className="addItems">
                        <input type="text" placeholder="Add Todo Items..."
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :
                                <i className="far fa-edit add-btn" style={{marginLeft:"-3rem"}} title="Update Item" onClick={addItem}></i>
                        }
                    
                    </div>
                    {/* lists of the tasks */}
                    <div className="showItems" >
                        {
                            filteredTodos.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3 className={`todo-item ${elem.completed ? "completed" : ""}`}>{elem.name}</h3>
                                        <h3 className={`todo-item ${elem.completed ? "completed" : ""}`}>{ctime}</h3>
                                        <div className="todo-btn">
                                            <i className="fas fa-check add-btn" title="Edit Item" onClick={() => completeItem(elem.id)} ></i>
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* Status Change */}
                    <div className='select'>
                        <select onChange={statusHandler} name='todos' className='filter-todo'>
                            <option value="All">All</option>
                            <option value="completed">Completed</option>
                            <option value="uncompleted">Uncompleted</option>

                        </select>
                    </div>
                    {/* Remove all task button  */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> CHECK LIST </span> </button>
                    </div>
                </div>
            </div>
        </>
    )


}

export default Todo