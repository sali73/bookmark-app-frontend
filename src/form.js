import React from 'react';
import "./css/style.css";

export default (props) => {
    const [formData, setFormData] = React.useState(props.initial);

    React.useEffect(() => {
        setFormData(props.initial);
    }, [props.initial]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <>
            <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="Title"
                onChange={handleChange}
                class="form-control"
            />
            <input
                type="text"
                name="url"
                value={formData.url}
                placeholder="URL"
                onChange={handleChange}
                class="form-control"
            />
            <button
                class="btn btn-secondary"
                onClick={() => {
                    props.handleSubmit(formData);
                    setFormData(props.initial);
                }}
            >
                SUBMIT
            </button>
        </>
    );
}