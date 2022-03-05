import React from 'react';
import { useState } from 'react';

import env from '../../../env.json';

export default function Create() {
    const [url, setUrl] = useState('');
    const [inputSectClass, setInputSectClass] = useState('');
    const [outputSectClass, setOutputSectClass] = useState('hidden');

    const sendData = (obj) => {
        setInputSectClass('hidden');
        setOutputSectClass('');

        fetch(env.urlBackend, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then( response => {
                console.log(response);

                if (response.result) {
                    setUrl(env.urlFrontend + '/' + response.url);
                }
        });
    }

    const loadDataFromForm = (event) => {
        event.preventDefault();

        let note = event.target.elements.note.value;
        note = note.trim();

        if (note === '') {
            alert('Empty note is not allowed!');
            return false;
        }

        sendData({"note": note});
    }

    return(
        <article>
            <h1>Create a new note</h1>
            <section className={inputSectClass}>
                <form onSubmit={loadDataFromForm}>
                    <label htmlFor="note">Write note</label>
                    <textarea name="note" id="note" defaultValue="default value"></textarea>
                    <button type="submit">Create</button>
                </form>
            </section>
            <section className={outputSectClass}>
                <div>
                    {url}
                </div>
                <div>
                    <button onClick={() => window.location.reload()}>Create note</button>
                </div>
            </section>
        </article>
    );
}
