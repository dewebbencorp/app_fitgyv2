import React, { useState } from "react";
import "./survey.css";

export const Survey = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [isVisible, setIsVisible] = useState(true)

    const handleRadioChange = (event: { target: { value: React.SetStateAction<null>; }; }) => {
        setSelectedValue(event.target.value);
    };



    return (
        <>
            {isVisible && <div className="card-container-survey">
                <div className="survey-card">
                    <h1> Lorem ipsum dolor sit amet. {selectedValue}</h1>
                    <div className="rating">
                        <input
                            value="5"
                            name="rating"
                            id="star5"
                            type="radio"
                            checked={selectedValue === "5"}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="star5"></label>
                        <input
                            value="4"
                            name="rating"
                            id="star4"
                            type="radio"
                            checked={selectedValue === "4"}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="star4"></label>
                        <input
                            value="3"
                            name="rating"
                            id="star3"
                            type="radio"
                            checked={selectedValue === "3"}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="star3"></label>
                        <input
                            value="2"
                            name="rating"
                            id="star2"
                            type="radio"
                            checked={selectedValue === "2"}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="star2"></label>
                        <input
                            value="1"
                            name="rating"
                            id="star1"
                            type="radio"
                            checked={selectedValue === "1"}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="star1"></label>
                    </div>
                </div>
            </div>
            }
        </>

    );
};
