import React, { useCallback } from "react";
import { useContext, useEffect, useState } from "react";

import { BG_COLOR } from "../constants";
import DatepickerContext from "../contexts/DatepickerContext";

export interface TimepickerProps {
    onSelect: (hour: string, minute: string, ampm: string) => void;
}

export default function Timepicker(props: TimepickerProps) {
    const { primaryColor, value } = useContext(DatepickerContext);
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [ampm, setAMPM] = useState("am");

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (value && value.startTime && value.endTime) {
            const [h, m, a] = value.startTime.split(":");
            setHour(h);
            setMinute(m);
            setAMPM(a);
        }
    }, [value]);

    const onInternalStateChange = useCallback((hour: string, minute: string, ampm: string) => {
        if (hour.length === 0 || minute.length === 0) {
            return;
        }
        if ((hour.length > 0, minute.length > 0, ampm.length > 0)) {
            let nHour = parseInt(hour);
            let sHour = "";
            if (ampm === "pm") {
                if (nHour < 12) {
                    nHour += 12;
                }
                if (nHour < 10) {
                    sHour = `0${nHour}`;
                } else {
                    sHour = `${nHour}`;
                }
            } else {
                if (nHour == 12) {
                    sHour = "00";
                } else {
                    sHour = hour;
                }
            }
            props.onSelect(sHour, minute, ampm);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const AMPMSwitch = () => {
        return (
            <label className="relative inline-flex items-center justify-center p-1 bg-white rounded-md cursor-pointer select-none themeSwitcherTwo shadow-card dark:bg-slate-800">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() => {
                        setIsChecked(!isChecked);
                        setAMPM(isChecked ? "am" : "pm");
                        onInternalStateChange(hour, minute, isChecked ? "am" : "pm");
                    }}
                />
                <span
                    className={`flex items-center space-x-[6px] rounded py-2 px-[10px] text-sm font-medium ${
                        !isChecked ? `${BG_COLOR["500"][primaryColor]}` : "text-body-color"
                    }`}
                >
                    AM
                </span>
                <span
                    className={`flex items-center space-x-[6px] rounded py-2 px-[10px] text-sm font-medium ${
                        isChecked ? `${BG_COLOR["500"][primaryColor]}` : "text-body-color"
                    }`}
                >
                    PM
                </span>
            </label>
        );
    };

    return (
        <div className="w-full p-2 pl-3 mt-2">
            <div className="flex justify-between">
                <select
                    name="hours"
                    role="button"
                    className="form-select transition duration-300 ease-in-out  bg-transparent outline-none appearance-none text-md hover:opacity-80 hover:-translate-y-[2px] hover:scale-105 rounded-md"
                    value={hour}
                    onChange={e => {
                        setHour(e.target.value);
                        onInternalStateChange(e.target.value, minute, ampm);
                    }}
                >
                    <option value="" selected disabled hidden>
                        시간
                    </option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                <span className="mx-3 text-md place-self-center">:</span>
                <select
                    name="minutes"
                    role="button"
                    value={minute}
                    className="form-select mr-4 transition duration-300 ease-in-out bg-transparent outline-none appearance-none text-md hover:opacity-80 hover:-translate-y-[2px] hover:scale-105 rounded-md"
                    onChange={e => {
                        setMinute(e.target.value);
                        onInternalStateChange(hour, e.target.value, ampm);
                    }}
                >
                    <option value="" selected disabled hidden>
                        분
                    </option>
                    <option value="00">00</option>
                    <option value="05">05</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                </select>
                <AMPMSwitch />
            </div>
        </div>
    );
}
