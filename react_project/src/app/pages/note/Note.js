import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import env from '../../../env.json';

export default function Note() {
    let { noteURL } = useParams();

    const [noteText, setNoteText] = useState('');
    const [inputSectClass, setInputSectClass] = useState('');
    const [outputSectClass, setOutputSectClass] = useState('hidden');
    const [errorSectClass, setErrorSectClass] = useState('hidden');

    useEffect( () => {
        if (noteURL !== undefined) {
            fetch(env.urlBackend, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify({"url": noteURL})
            })
                .then(response => response.json())
                .then(response => {
                    if (response.result) {
                        setNoteText(response.note);
                        setOutputSectClass('');
                        setInputSectClass('hidden');
                        setErrorSectClass('hidden');
                    } else if (!response.result) {
                        setOutputSectClass('hidden');
                        setInputSectClass('hidden');
                        setErrorSectClass('');
                    }
                })
        } else {
            setOutputSectClass('hidden');
            setInputSectClass('');
            setErrorSectClass('hidden');
        }
    }, []);

    const getNote = (event) => {
        event.preventDefault();

        let noteId = event.target.elements.noteId.value;
        noteId.trim();

        if (noteId === '') {
            alert('Empty note id is not allowed!');
            return false;
        }

        noteURL = noteId;
        window.location.href = env.urlFrontend + '/' + noteId;
    }

    return(
        <article>
            <section className={outputSectClass}>
                <h2>Note:</h2>
                <div>{noteText}</div>
                <button onClick={() => window.location.href = env.urlFrontend}>One more note</button>
            </section>
            <section className={inputSectClass}>
                <form onSubmit={getNote}>
                    <label htmlFor="note-id">Input note id</label>
                    <input type="text" name="noteId" id="noteId" />
                    <button type="submit">Search for note</button>
                </form>
            </section>
            <section className={errorSectClass}>
                <p>There is no such note :(</p>
            </section>
        </article>
    );
}
