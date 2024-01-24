"use client";
import React, { useState, useEffect } from "react";

const supportAgentPage = () => {
    const [error, setError] = useState(null)
    const [agents, setAgents] = useState({ supportAgents: [] });

    //getAllAgents api
    const fetchAgents = async () => {
        try {
          const res = await fetch('http://localhost:3001/api/support-agents', {
            cache: 'no-store'
          });
          const agentsData = await res.json();
          setAgents(agentsData);
        } catch (error) {
          console.error('Error fetching agents:', error.message);
        }
    };

    useEffect(() => {
      fetchAgents();
    }, []);

    function handleFormSubmit(event) {
        event.preventDefault();
        setError(null);
      
        const formData = {
          name: event.target.name.value,
          email: event.target.email.value,
          phone: event.target.phone.value,
          description: event.target.description.value,
        };
      
        fetch('http://localhost:3001/api/support-agents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((res) => {
            if (res.ok) {//get all ticket to fetch currently added ticket
              fetchAgents();
              event.target.reset();
              document.getElementById('my_modal_2').close();
            } else {
              return res.json();
            }
          })
          .then((errorResponse) => {
            if (errorResponse && errorResponse.errors) {
              //get the errors from api response
              const errorMessage = Object.values(errorResponse.errors).join(', ');
              setError(errorMessage);
            } else {
              //default error message
              setError('Failed to submit the form. Please try again.');
            }
          })
          .catch((error) => {
            setError('An unexpected error occurred. Please try again.');
            console.error('Error submitting the form:', error.message);
          });
      }
    return(
        <>

<button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>Add Agent</button>
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
            {error && <div style={{ color: 'brown' }}>{error}</div>}
                <small className="py-4">Press ESC key to close</small>
                <h3 className="font-bold text-lg">Add new Agent</h3>
                
                <form method="dialog" onSubmit={handleFormSubmit} >
                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Please enter your name</span>
                    </div>
                    <input type="text" id="name" name="name" placeholder="Name" className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Please enter email</span>
                    </div>
                    <input type="text" id="email" name="email" placeholder="Enter email" className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Please enter phone</span>
                    </div>
                    <input type="text" id="phone" name="phone" placeholder="Enter phone" className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Please enter description</span>
                    </div>
                    <input type="text" id="description" name="description" placeholder="Enter description"  className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <button className="btn" type="submit" color="primary">Submit</button>
                </form>
            </div>
        </dialog>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Description</th>
                    <th>Active</th>
                    <th>Date Created</th>
                </tr>
            </thead>
            <tbody>
                {agents.supportAgents.map(agent => (
                    <tr key={agent._id}>
                        <th>{agent.name}</th>
                        <th>{agent.email}</th>
                        <th>{agent.phone}</th>
                        <th>{agent.description}</th>
                        <th>{agent.active}</th>
                        <th>{agent.dateCreated}</th>
                    </tr>
                ))}
            </tbody>
            
        </table>
        </>
    )
}

export default supportAgentPage