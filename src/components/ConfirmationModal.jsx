// react imports
import React, { useState, useEffect } from "react";
import {DataType, Table, useTable} from 'ka-table';
import { getDatabase, ref, onValue } from "firebase/database";

function ConfirmationModal({ modalTitle, closeFunction, saveFunction }){

    const handleClose = () => {
        //props.onClose();
        closeFunction();
    };
    const handleSave = () => {
        //props.onSave();
        saveFunction();
    };
    useEffect(() => {
      
    }, []);



  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75">
          </div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">¿Sure you want to {modalTitle} it?</h2>
          </div>

          <div className="p-4">
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConfirmationModal; 