import dayjs from "dayjs";
import React, { useCallback } from "react";
import { useContext, useEffect, useState } from "react";

import { BG_COLOR, DATE_FORMAT } from "../constants";
import DatepickerContext from "../contexts/DatepickerContext";

export default function Timepicker() {
    const {
        primaryColor,
        value,
        changeSelectedDate,
        changeSelectedTime,
        hideDatepicker,
        changeDatepickerValue,
        selectedDate,
        selectedTime,
        changePeriod,
        changeDayHover
    } = useContext(DatepickerContext);
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [ampm, setAMPM] = useState("am");
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        restoreState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const onSelect = useCallback((hour: string, minute: string, ampm: string) => {
        if (!hour || !minute || !ampm) {
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
            changeSelectedTime(`${sHour}:${minute}:${ampm}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCancel = () => {
        restoreState();
        changeSelectedDate(value ? value : null);
        changeSelectedTime(
            value && value.startDate ? dayjs(value.startDate).format(DATE_FORMAT) : null
        );
        changePeriod({
            start: value && value.startDate ? dayjs(value.startDate).format(DATE_FORMAT) : null,
            end: value && value.endDate ? dayjs(value.endDate).format(DATE_FORMAT) : null
        });
        changeDayHover(
            value && value.startDate ? dayjs(value.startDate).format(DATE_FORMAT) : null
        );
        hideDatepicker();
    };

    const onConfirm = () => {
        if (selectedDate) {
            changeDatepickerValue({
                ...selectedDate,
                startTime: selectedTime,
                endTime: selectedTime
            });
            hideDatepicker();
        }
    };

    const restoreState = () => {
        if (value && value.startTime && value.endTime) {
            const [h, m, a] = value.startTime.split(":");
            if ((h && m && a && h.length > 0, m.length > 0 && a.length > 0)) {
                let nHour: number = parseInt(h);
                nHour = nHour < 12 ? nHour : nHour - 12;
                let sHour = `${nHour === 0 ? 12 : nHour}`;
                sHour = sHour.length < 2 ? `0${sHour}` : sHour;
                setHour(sHour);
                setMinute(m);
                setAMPM(a);
                setIsChecked(a == "pm");
            }
        } else {
            setHour("");
            setMinute("");
            setAMPM("am");
            setIsChecked(false);
        }
    };

    useEffect(() => {
        if (!selectedTime) {
            restoreState();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTime]);

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
                        onSelect(hour, minute, isChecked ? "am" : "pm");
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
                        onSelect(e.target.value, minute, ampm);
                    }}
                >
                    <option value="" disabled>
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
                        onSelect(hour, e.target.value, ampm);
                    }}
                >
                    <option value="" disabled>
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
            <div className="flex flex-row gap-3 pt-6 place-content-center">
                <button onClick={onCancel} className={"w-28 h-10 rounded-md bg-[#CCCCCC]"}>
                    취소
                </button>
                <button
                    disabled={selectedDate && selectedTime ? false : true}
                    onClick={onConfirm}
                    className={`w-28 h-10 rounded-md ${
                        selectedDate && selectedTime
                            ? `${BG_COLOR["500"][primaryColor]}`
                            : "bg-[#CCCCCC]"
                    }`}
                >
                    확인
                </button>
            </div>
        </div>
    );
}
