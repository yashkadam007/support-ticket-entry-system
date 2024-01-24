"use client";
import React, { useState, useEffect } from "react";

const supportTicketPage = () => {
    const [error, setError] = useState(null)
    const [tickets, setTickets] = useState({ supportTickets: [] });

    //getAlltickets api
    const fetchTickets = async () => {
        try {
          const res = await fetch('http://localhost:3001/api/support-tickets', {
            cache: 'no-store'
          });
          const ticketsData = await res.json();
          setTickets(ticketsData);
        } catch (error) {
          console.error('Error fetching tickets:', error.message);
        }
    };

    useEffect(() => {
      fetchTickets();
    }, []);

  function handleFormSubmit(event) {
    event.preventDefault();
    setError(null);
  
    const formData = {
      topic: event.target.topic.value,
      description: event.target.description.value,
      severity: event.target.severity.value,
      type: event.target.type.value,
      resolvedOn: event.target.resolvedOn.value,
    };
  
    fetch('http://localhost:3001/api/support-tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {//get all ticket to fetch currently added ticket
          fetchTickets();
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
        <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>Add Ticket</button>
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
            {error && <div style={{ color: 'brown' }}>{error}</div>}
                <small className="py-4">Press ESC key to close</small>
                <h3 className="font-bold text-lg">Add Ticket</h3>
                
                <form method="dialog" onSubmit={handleFormSubmit} >
                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Please enter topic</span>
                    </div>
                    <input type="text" id="topic" name="topic" placeholder="Enter topic" className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Please enter Description</span>
                    </div>
                    <input type="text" id="description" name="description" placeholder="Enter description" className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Please enter severity</span>
                    </div>
                    <input type="text" id="severity" name="severity" placeholder="Enter severity" className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Please enter type</span>
                    </div>
                    <input type="text" id="type" name="type" placeholder="Enter type"  className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Please enter date the ticket got resolved:</span>
                    </div>
                    <input type="text" id="resolvedOn" name="resolvedOn" placeholder="Enter resolvedOn" className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <button className="btn" type="submit" color="primary">Submit</button>
                </form>
            </div>
        </dialog>

        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Topic</th>
                    <th>Description</th>
                    <th>Date Created</th>
                    <th>Severity</th>
                    <th>Assigned To</th>
                    <th>Status</th>
                    <th>Resolved On</th>
                </tr>
            </thead>
            <tbody>
                {tickets.supportTickets.map(ticket => (
                    <tr key={ticket._id}>
                        <th>{ticket.topic}</th>
                        <th>{ticket.description}</th>
                        <th>{ticket.dateCreated}</th>
                        <th>{ticket.severity}</th>
                        <th>{ticket.assignedTo}</th>
                        <th>{ticket.status}</th>
                        <th>{ticket.resolvedOn}</th>
                    </tr>
                ))}
            </tbody>
            
        </table>
        </>
        
    )
}

export default supportTicketPage