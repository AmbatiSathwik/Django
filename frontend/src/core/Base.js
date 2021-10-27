import React from 'react';
import Menu from './Menu';


function Base({ title="Title" , description="Description" , className="bg-dark text-white p-4" , children }) {
    return (
        <div>
            <div className="container-fluid">
            <Menu />
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                
                <div className={className}>{children}</div>
            </div>

            <footer className="footer bg-success mt-auto py-2">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>Footer</h4>
                    <button className="btn btn-warning btn-lg">Contact</button>
                    <div className="container">
                        <span className="text-warning">
                            Amazing project
                        </span>
                    </div>
                </div>
            </footer>
            
        </div>
    )
}

export default Base
