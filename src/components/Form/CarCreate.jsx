import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import MyLoader from "../UI/Loader/MyLoader";
import {create_car_fetch} from "../../store/carReduser";
import CategoriesSubSubcategoriesDropdowns from "../Dropdown/CategoriesSubSubcategoriesDropdowns";
import {
    car_accounting,
    car_body_type,
    car_brand_model_year,
    car_color,
    car_drive_unit,
    car_engine_type,
    car_engine_volume,
    car_interior_color,
    car_interior_material,
    car_registration_country,
    car_state,
    car_transmission
} from "../../utils/cars";
import { useForm } from "react-hook-form";
import CategoriesDropdown from "../Dropdown/CategoriesDropdown";
import {locations} from "../../utils/locations";
import classes from "./CarCreate.component.css"
import MyButton from "../UI/Button/MyButton";
import CategoriesSubcategoriesDropdowns from "../Dropdown/CategoriesSubcategoriesDropdowns";
import DropdownStylishForm from "../Dropdown/DropdownStylishForm";
import DropdownStylishThreeForm from "../Dropdown/DropdownStylishThreeForm";
import DropdownStylishTwoForm from "../Dropdown/DropdownStylishTwoForm";

const CarCreate = () => {
    const dispatcher = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const { register, setValue, handleSubmit } = useForm()

    // для работы чекбоксов
    const [abs, set_abs] = useState(false)
    const [esp, set_esp] = useState(false)
    const [asr, set_asr] = useState(false)
    const [anti_slip, set_anti_slip] = useState(false)
    const [immobilizer, set_immobilizer] = useState(false)
    const [alarm_system, set_alarm_system] = useState(false)
    const [alloy_wheels, set_alloy_wheels] = useState(false)
    const [roof_rails, set_roof_rails] = useState(false)
    const [trailer_coupling, set_trailer_coupling] = useState(false)
    const [seats, set_seats] = useState(false)
    const [windshield, set_windshield] = useState(false)
    const [mirrors, set_mirrors] = useState(false)
    const [steering_wheel, set_steering_wheel] = useState(false)
    const [autonomous_heater, set_autonomous_heater] = useState(false)
    const [engine_autorun, set_engine_autorun] = useState(false)
    const [cruise_control, set_cruise_control] = useState(false)
    const [multimedia, set_multimedia] = useState(false)
    const [electric_seat_adjustment, set_electric_seat_adjustment] = useState(false)
    const [front_electric_windows, set_front_electric_windows] = useState(false)
    const [rear_electric_windows, set_rear_electric_windows] = useState(false)
    const [hatch, set_hatch] = useState(false)
    const [panoramic_roof, set_panoramic_roof] = useState(false)
    const [front_cushions, set_front_cushions] = useState(false)
    const [side_cushions, set_side_cushions] = useState(false)
    const [rear_cushions, set_rear_cushions] = useState(false)
    const [xenon, set_xenon] = useState(false)
    const [fog_lights, set_fog_lights] = useState(false)
    const [led_lights, set_led_lights] = useState(false)
    const [aux_or_ipod, set_aux_or_ipod] = useState(false)
    const [bluetooth, set_bluetooth] = useState(false)
    const [cd_or_mp3, set_cd_or_mp3] = useState(false)
    const [usb, set_usb] = useState(false)
    const [multimedia_screen, set_multimedia_screen] = useState(false)
    const [regular_navigation, set_regular_navigation] = useState(false)
    const [rain_sensor, set_rain_sensor] = useState(false)
    const [rear_view_camera, set_rear_view_camera] = useState(false)
    const [parking_sensors, set_parking_sensors] = useState(false)
    const [monitoring_dead_zones_mirrors, set_monitoring_dead_zones_mirrors] = useState(false)
    const [climate_control, set_climate_control] = useState(false)
    const [conditioner, set_conditioner] = useState(false)

    // Состояние для отображения каждой группы по очереди
    const [showGroup1, setShowGroup1] = useState(false);
    const [showGroup2, setShowGroup2] = useState(false);
    const [showGroup3, setShowGroup3] = useState(false);
    const [showGroup4, setShowGroup4] = useState(false);
    const [showGroup5, setShowGroup5] = useState(false);
    const [showGroup6, setShowGroup6] = useState(false);
    const [showGroup7, setShowGroup7] = useState(false);
    const [showGroup8, setShowGroup8] = useState(false);
    const [showGroup9, setShowGroup9] = useState(false);

    // Состояние для частичного вывода инпутов для загрузки фото
    const [showPhoto1, setShowPhoto1] = useState(false);
    const [showPhoto2, setShowPhoto2] = useState(false);
    const [showPhoto3, setShowPhoto3] = useState(false);
    const [showPhoto4, setShowPhoto4] = useState(false);

    // Состояния для частичного вывода инпутов для номеров телефона
    const [showPhone1, setShowPhone1] = useState(false);
    const [showPhone2, setShowPhone2] = useState(false);

    // Состояния для управления инпутами для номеров телефона
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");

    const onSubmit = (data) => {
        data.photo_1 = data.photo_1?.[0] ?? null    // null, если файла нет
        data.photo_2 = data.photo_2?.[0] ?? null
        data.photo_3 = data.photo_3?.[0] ?? null
        data.photo_4 = data.photo_3?.[0] ?? null
        data.photo_5 = data.photo_4?.[0] ?? null
        dispatcher(create_car_fetch({data:data, setIsLoading:setIsLoading}))
    };

    const ScrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth"
        });
    };


    return (
        <div>
            {isLoading
                ? <div className="loader-box">
                    <MyLoader/>
                </div>
                : <form onSubmit={handleSubmit(onSubmit)}
                        className="form"
                >
                    <DropdownStylishThreeForm categories={car_brand_model_year}
                                              register={register}
                                              setValue={setValue}
                                              name="brand"
                                              subname="model"
                                              subsubname="year"
                                              title="Марка"
                                              subtitle="Модель"
                                              subsubtitle="Год выпуска"
                    />

                    {!showGroup1 && (
                        <MyButton onClick={() => {
                            setShowGroup1(true);
                            setTimeout(function() {
                                ScrollToBottom()
                            }, 200);
                        }}
                        >
                            Далее
                        </MyButton>
                    )}

                    {showGroup1 && (
                        <div className="form-characteristics">
                            <div className="form-subtitles">Параметры</div>

                            <div className="dropdown_one">
                                <DropdownStylishForm categories={car_body_type}
                                                     setValue={setValue}
                                                     register={register}
                                                     name="body_type"
                                                     title="Тип кузова"
                                />
                            </div>

                            <div className="dropdown_one">
                                <DropdownStylishForm categories={car_transmission}
                                                     setValue={setValue}
                                                     register={register}
                                                     name="transmission"
                                                     title="Коробка передач"
                                />
                            </div>

                            <div className="dropdown_one">
                                <DropdownStylishForm categories={car_engine_type}
                                                     setValue={setValue}
                                                     register={register}
                                                     name="engine_type"
                                                     title="Тип двигателя"
                                />
                            </div>

                            <div className="dropdown_one">
                                <DropdownStylishForm categories={car_engine_type}
                                                     setValue={setValue}
                                                     register={register}
                                                     name="engine_type"
                                                     title="Тип двигателя"
                                />
                            </div>

                            <div className="dropdown_one">
                                <DropdownStylishForm categories={car_drive_unit}
                                                     setValue={setValue}
                                                     register={register}
                                                     name="drive_unit"
                                                     title="Привод"
                                />
                            </div>

                            <div className="dropdown_one">
                                <DropdownStylishForm categories={car_engine_volume}
                                                     setValue={setValue}
                                                     register={register}
                                                     name="engine_volume"
                                                     title="Объем, л"
                                />
                            </div>

                            {!showGroup2 && (
                                <MyButton onClick={() => {
                                    setShowGroup2(true);
                                    setTimeout(function () {
                                        ScrollToBottom()
                                    }, 200);
                                }}
                                >
                                    Далее
                                </MyButton>
                            )}
                        </div>
                    )}

                    {showGroup2 && (
                        <div className="form-characteristics">
                            <div className="form-subtitles">VIN-номер</div>

                            <label htmlFor="vin">Код из 17 символов</label>
                            <input {...register("vin")} id="vin" type="text"/>

                            {!showGroup3 && (
                                <MyButton onClick={() => {
                                    setShowGroup3(true);
                                    setTimeout(function() {
                                        ScrollToBottom()
                                    }, 200);
                                }}
                                >
                                    Далее
                                </MyButton>
                            )}
                        </div>
                    )}

                    {showGroup3 && (
                        <div className="form-characteristics">
                            <div className="form-subtitles">Состояние и цвет</div>

                            <div className="dropdown_one">
                                <DropdownStylishForm categories={car_state}
                                                     setValue={setValue}
                                                     register={register}
                                                     name="state"
                                                     title="Состояние"
                                />
                            </div>

                            <label htmlFor="mileage">Пробег*</label>
                            <input {...register("mileage")} id="mileage" type="number"/>

                            <div className="dropdown_one">
                                <DropdownStylishForm categories={car_color}
                                                     setValue={setValue}
                                                     register={register}
                                                     name="color"
                                                     title="Цвет"
                                />
                            </div>

                            <div className="dropdown_one">
                                <DropdownStylishForm categories={car_interior_material}
                                                     setValue={setValue}
                                                     register={register}
                                                     name="interior_material"
                                                     title="Материал интерьера"
                                />
                            </div>

                            <div className="dropdown_one">
                                <DropdownStylishForm categories={car_interior_color}
                                                     setValue={setValue}
                                                     register={register}
                                                     name="interior_color"
                                                     title="Цвет интерьера"
                                />
                            </div>

                            {!showGroup4 && (
                                <MyButton onClick={() => {
                                    setShowGroup4(true);
                                    setTimeout(function () {
                                        ScrollToBottom()
                                    }, 200);
                                }}
                                >
                                    Далее
                                </MyButton>
                            )}
                        </div>
                    )}

                    {showGroup4 && (
                        <div className="form-equipment">
                            <div className="form-subtitles">Комплектация</div>

                            <div className="form-equipment-conteiner">
                                <div className="form-subtitles-categs">
                                    <div className="categs-title">Системы безопасности</div>

                                    <div className="checkbox">
                                        <input {...register("abs")}
                                               id="abs"
                                               type="checkbox"
                                               checked={abs}
                                               onChange={(event) =>
                                                   set_abs(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="abs">ABS</label>

                                    <div className="checkbox">
                                        <input {...register("esp")}
                                               id="esp"
                                               type="checkbox"
                                               checked={esp}
                                               onChange={(event) =>
                                                   set_esp(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="esp">ESP</label>

                                    <div className="checkbox">
                                        <input {...register("asr")}
                                               id="asr"
                                               type="checkbox"
                                               checked={asr}
                                               onChange={(event) =>
                                                   set_asr(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="asr">ASR</label>

                                    <div className="checkbox">
                                        <input {...register("anti_slip")}
                                               id="anti_slip"
                                               type="checkbox"
                                               checked={anti_slip}
                                               onChange={(event) =>
                                                   set_anti_slip(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="anti_slip">Антипробуксовочная</label>

                                    <div className="checkbox">
                                        <input {...register("immobilizer")}
                                               id="immobilizer"
                                               type="checkbox"
                                               checked={immobilizer}
                                               onChange={(event) =>
                                                   set_immobilizer(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="immobilizer">Иммобилайзер</label>

                                    <div className="checkbox">
                                        <input {...register("alarm_system")}
                                               id="alarm_system"
                                               type="checkbox"
                                               checked={alarm_system}
                                               onChange={(event) =>
                                                   set_alarm_system(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="alarm_system">Сигнализация</label>
                                </div>

                                <div className="form-subtitles-categs">
                                    <div className="categs-title">Системы безопасности</div>

                                    <div className="checkbox">
                                        <input {...register("alloy_wheels")}
                                               id="alloy_wheels"
                                               type="checkbox"
                                               checked={alloy_wheels}
                                               onChange={(event) =>
                                                   set_alloy_wheels(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="alloy_wheels">Легкосплавные диски</label>

                                    <div className="checkbox">
                                        <input {...register("roof_rails")}
                                               id="roof_rails"
                                               type="checkbox"
                                               checked={roof_rails}
                                               onChange={(event) =>
                                                   set_roof_rails(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="roof_rails">Рейлинги на крыше</label>

                                    <div className="checkbox">
                                        <input {...register("trailer_coupling")}
                                               id="trailer_coupling"
                                               type="checkbox"
                                               checked={trailer_coupling}
                                               onChange={(event) =>
                                                   set_trailer_coupling(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="trailer_coupling">Фаркоп</label>
                                </div>

                                <div className="form-subtitles-categs">
                                    <div className="categs-title">Обогрев</div>

                                    <div className="checkbox">
                                        <input {...register("seats")}
                                               id="seats"
                                               type="checkbox"
                                               checked={seats}
                                               onChange={(event) =>
                                                   set_seats(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="seats">Сидений</label>

                                    <div className="checkbox">
                                        <input {...register("windshield")}
                                               id="windshield"
                                               type="checkbox"
                                               checked={windshield}
                                               onChange={(event) =>
                                                   set_windshield(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="windshield">Лобового стекла</label>

                                    <div className="checkbox">
                                        <input {...register("mirrors")}
                                               id="mirrors"
                                               type="checkbox"
                                               checked={mirrors}
                                               onChange={(event) =>
                                                   set_mirrors(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="mirrors">Зеркал</label>

                                    <div className="checkbox">
                                        <input {...register("steering_wheel")}
                                               id="steering_wheel"
                                               type="checkbox"
                                               checked={steering_wheel}
                                               onChange={(event) =>
                                                   set_steering_wheel(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="steering_wheel">Руля</label>

                                    <div className="checkbox">
                                        <input {...register("autonomous_heater")}
                                               id="autonomous_heater"
                                               type="checkbox"
                                               checked={autonomous_heater}
                                               onChange={(event) =>
                                                   set_autonomous_heater(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="autonomous_heater">Автономный отопитель</label>
                                </div>

                                <div className="form-subtitles-categs">
                                    <div className="categs-title">Комфорт</div>

                                    <div className="checkbox">
                                        <input {...register("engine_autorun")}
                                               id="engine_autorun"
                                               type="checkbox"
                                               checked={engine_autorun}
                                               onChange={(event) =>
                                                   set_engine_autorun(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="engine_autorun">Автозапуск двигателя</label>

                                    <div className="checkbox">
                                        <input {...register("cruise_control")}
                                               id="cruise_control"
                                               type="checkbox"
                                               checked={cruise_control}
                                               onChange={(event) =>
                                                   set_cruise_control(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="cruise_control">Круиз-контрол</label>

                                    <div className="checkbox">
                                        <input {...register("multimedia")}
                                               id="multimedia"
                                               type="checkbox"
                                               checked={multimedia}
                                               onChange={(event) =>
                                                   set_multimedia(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="multimedia">Управление мультимедиа с руля</label>

                                    <div className="checkbox">
                                        <input {...register("electric_seat_adjustment")}
                                               id="electric_seat_adjustment"
                                               type="checkbox"
                                               checked={electric_seat_adjustment}
                                               onChange={(event) =>
                                                   set_electric_seat_adjustment(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="electric_seat_adjustment">Электрорегулировка сидений</label>

                                    <div className="checkbox">
                                        <input {...register("front_electric_windows")}
                                               id="front_electric_windows"
                                               type="checkbox"
                                               checked={front_electric_windows}
                                               onChange={(event) =>
                                                   set_front_electric_windows(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="front_electric_windows">Передние электро-стеклоподъёмники</label>

                                    <div className="checkbox">
                                        <input {...register("rear_electric_windows")}
                                               id="rear_electric_windows"
                                               type="checkbox"
                                               checked={rear_electric_windows}
                                               onChange={(event) =>
                                                   set_rear_electric_windows(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="rear_electric_windows">Задние электро-стеклоподъёмники</label>
                                </div>

                                <div className="form-subtitles-categs">
                                    <div className="categs-title">Интерьер</div>

                                    <div className="checkbox">
                                        <input {...register("hatch")}
                                               id="hatch"
                                               type="checkbox"
                                               checked={hatch}
                                               onChange={(event) =>
                                                   set_hatch(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="hatch">Люк</label>

                                    <div className="checkbox">
                                        <input {...register("panoramic_roof")}
                                               id="panoramic_roof"
                                               type="checkbox"
                                               checked={panoramic_roof}
                                               onChange={(event) =>
                                                   set_panoramic_roof(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="panoramic_roof">Панорамная крыша</label>
                                </div>

                                <div className="form-subtitles-categs">
                                    <div className="categs-title">Подушки</div>

                                    <div className="checkbox">
                                        <input {...register("front_cushions")}
                                               id="front_cushions"
                                               type="checkbox"
                                               checked={front_cushions}
                                               onChange={(event) =>
                                                   set_front_cushions(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="front_cushions">Передние подушки</label>

                                    <div className="checkbox">
                                        <input {...register("side_cushions")}
                                               id="side_cushions"
                                               type="checkbox"
                                               checked={side_cushions}
                                               onChange={(event) =>
                                                   set_side_cushions(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="side_cushions">Боковые подушки</label>

                                    <div className="checkbox">
                                        <input {...register("rear_cushions")}
                                               id="rear_cushions"
                                               type="checkbox"
                                               checked={rear_cushions}
                                               onChange={(event) =>
                                                   set_rear_cushions(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="rear_cushions">Задние подушки</label>
                                </div>

                                <div className="form-subtitles-categs">
                                    <div className="categs-title">Фары</div>

                                    <div className="checkbox">
                                        <input {...register("xenon")}
                                               id="xenon"
                                               type="checkbox"
                                               checked={xenon}
                                               onChange={(event) =>
                                                   set_xenon(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="xenon">Ксеноновые</label>

                                    <div className="checkbox">
                                        <input {...register("fog_lights")}
                                               id="fog_lights"
                                               type="checkbox"
                                               checked={fog_lights}
                                               onChange={(event) =>
                                                   set_fog_lights(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="fog_lights">Противотуманные</label>

                                    <div className="checkbox">
                                        <input {...register("led_lights")}
                                               id="led_lights"
                                               type="checkbox"
                                               checked={led_lights}
                                               onChange={(event) =>
                                                   set_led_lights(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="led_lights">Светодиодные</label>
                                </div>

                                <div className="form-subtitles-categs">
                                    <div className="categs-title">Мультимедиа</div>

                                    <div className="checkbox">
                                        <input {...register("aux_or_ipod")}
                                               id="aux_or_ipod"
                                               type="checkbox"
                                               checked={aux_or_ipod}
                                               onChange={(event) =>
                                                   set_aux_or_ipod(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="aux_or_ipod">AUX или iPod</label>

                                    <div className="checkbox">
                                        <input {...register("bluetooth")}
                                               id="bluetooth"
                                               type="checkbox"
                                               checked={bluetooth}
                                               onChange={(event) =>
                                                   set_bluetooth(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="bluetooth">Bluetooth</label>

                                    <div className="checkbox">
                                        <input {...register("cd_or_mp3")}
                                               id="cd_or_mp3"
                                               type="checkbox"
                                               checked={cd_or_mp3}
                                               onChange={(event) =>
                                                   set_cd_or_mp3(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="cd_or_mp3">CD или MP3</label>

                                    <div className="checkbox">
                                        <input {...register("usb")}
                                               id="usb"
                                               type="checkbox"
                                               checked={usb}
                                               onChange={(event) =>
                                                   set_usb(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="usb">USB</label>

                                    <div className="checkbox">
                                        <input {...register("multimedia_screen")}
                                               id="multimedia_screen"
                                               type="checkbox"
                                               checked={multimedia_screen}
                                               onChange={(event) =>
                                                   set_multimedia_screen(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="multimedia_screen">Мультимедийный экран</label>

                                    <div className="checkbox">
                                        <input {...register("regular_navigation")}
                                               id="regular_navigation"
                                               type="checkbox"
                                               checked={regular_navigation}
                                               onChange={(event) =>
                                                   set_regular_navigation(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="regular_navigation">Штатная навигация</label>
                                </div>

                                <div className="form-subtitles-categs">
                                    <div className="categs-title">Системы помощи</div>

                                    <div className="checkbox">
                                        <input {...register("rain_sensor")}
                                               id="rain_sensor"
                                               type="checkbox"
                                               checked={rain_sensor}
                                               onChange={(event) =>
                                                   set_rain_sensor(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="rain_sensor">Датчик дождя</label>

                                    <div className="checkbox">
                                        <input {...register("rear_view_camera")}
                                               id="rear_view_camera"
                                               type="checkbox"
                                               checked={rear_view_camera}
                                               onChange={(event) =>
                                                   set_rear_view_camera(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="rear_view_camera">Камера заднего вида</label>

                                    <div className="checkbox">
                                        <input {...register("parking_sensors")}
                                               id="parking_sensors"
                                               type="checkbox"
                                               checked={parking_sensors}
                                               onChange={(event) =>
                                                   set_parking_sensors(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="parking_sensors">Парктроники</label>

                                    <div className="checkbox">
                                        <input {...register("monitoring_dead_zones_mirrors")}
                                               id="monitoring_dead_zones_mirrors"
                                               type="checkbox"
                                               checked={monitoring_dead_zones_mirrors}
                                               onChange={(event) =>
                                                   set_monitoring_dead_zones_mirrors(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="monitoring_dead_zones_mirrors">Контроль мертвых зон на зеркалах</label>
                                </div>

                                <div className="form-subtitles-categs">
                                    <div className="categs-title">Климат</div>

                                    <div className="checkbox">
                                        <input {...register("climate_control")}
                                               id="climate_control"
                                               type="checkbox"
                                               checked={climate_control}
                                               onChange={(event) =>
                                                   set_climate_control(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="climate_control">Климат-контроль</label>

                                    <div className="checkbox">
                                        <input {...register("conditioner")}
                                               id="conditioner"
                                               type="checkbox"
                                               checked={conditioner}
                                               onChange={(event) =>
                                                   set_conditioner(event.target.checked)}
                                        />
                                    </div>
                                    <label htmlFor="conditioner">Кондиционер</label>
                                </div>
                            </div>

                            {!showGroup5 && (
                                <MyButton onClick={() => {
                                    setShowGroup5(true);
                                    setTimeout(function() {
                                    ScrollToBottom()
                                }, 200);
                                }}
                                >
                                    Далее
                                </MyButton>
                            )}
                        </div>
                    )}

                    {showGroup5 && (
                        <div className="form-characteristics">
                            <div className="form-subtitles">Информация о регистрации</div>

                            <div className="dropdown_one">
                                <DropdownStylishForm categories={car_registration_country}
                                                     setValue={setValue}
                                                     register={register}
                                                     name="registration_country"
                                                     title="Страна регистрации"
                                />
                            </div>

                            <div className="dropdown_one">
                                <DropdownStylishForm categories={car_accounting}
                                                     setValue={setValue}
                                                     register={register}
                                                     name="accounting"
                                                     title="Учёт"
                                />
                            </div>

                            {!showGroup6 && (
                                <MyButton onClick={() => {
                                    setShowGroup6(true);
                                    setTimeout(function () {
                                        ScrollToBottom()
                                    }, 200);
                                }}
                                >
                                    Далее
                                </MyButton>
                            )}
                        </div>
                    )}

                    {showGroup6 && (
                        <div className="form-characteristics">
                            <div className="form-subtitles">Фотографии</div>

                            <label htmlFor="photo_1">Фото</label>
                            <div className="photo_item">
                                <input {...register("photo_1")}
                                       id="photo_1"
                                       type="file"
                                       className="photo_input"
                                />
                                <div>
                                    {!showPhoto1 && (
                                        <button type="button"
                                                className="add_photo"
                                                onClick={() => {
                                                    setShowPhoto1(true);
                                                    setTimeout(function() {
                                                        ScrollToBottom()
                                                    }, 200);
                                                }}
                                        >+ добавить ещё</button>
                                    )}
                                </div>
                            </div>

                            {showPhoto1 && (
                                <label htmlFor="photo_2">Фото 2</label>
                            )}
                            {showPhoto1 && (
                                <div className="photo_item">
                                    <input {...register("photo_2")}
                                           id="photo_2"
                                           type="file"
                                           className="photo_input"
                                    />
                                    <div>
                                        {!showPhoto2 && (
                                            <button type="button"
                                                    className="add_photo"
                                                    onClick={() => {
                                                        setShowPhoto2(true);
                                                        setTimeout(function() {
                                                            ScrollToBottom()
                                                        }, 200);
                                                    }}
                                            >+ добавить ещё</button>
                                        )}
                                        {showPhoto1 && !showPhoto2 && !showPhoto3 && !showPhoto4 && (
                                            <button type="button"
                                                    className="del_photo"
                                                    onClick={() => setShowPhoto1(false)}
                                            >убрать</button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {showPhoto2 && (
                                <label htmlFor="photo_3">Фото 3</label>
                            )}
                            {showPhoto2 && (
                                <div className="photo_item">
                                    <input {...register("photo_3")}
                                           id="photo_3"
                                           type="file"
                                           className="photo_input"
                                    />
                                    <div>
                                        {!showPhoto3 && (
                                            <button type="button"
                                                    className="add_photo"
                                                    onClick={() => {
                                                        setShowPhoto3(true);
                                                        setTimeout(function() {
                                                            ScrollToBottom()
                                                        }, 200);
                                                    }}
                                            >+ добавить ещё</button>
                                        )}
                                        {showPhoto2 && !showPhoto3 && !showPhoto4 && (
                                            <button type="button"
                                                    className="del_photo"
                                                    onClick={() => setShowPhoto2(false)}
                                            >убрать</button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {showPhoto3 && (
                                <label htmlFor="photo_4">Фото 4</label>
                            )}
                            {showPhoto3 && (
                                <div className="photo_item">
                                    <input {...register("photo_4")}
                                           id="photo_4"
                                           type="file"
                                           className="photo_input"
                                    />
                                    <div>
                                        {!showPhoto4 && (
                                            <button type="button"
                                                    className="add_photo"
                                                    onClick={() => {
                                                        setShowPhoto4(true);
                                                        setTimeout(function() {
                                                            ScrollToBottom()
                                                        }, 200);
                                                    }}
                                            >+ добавить ещё</button>
                                        )}
                                        {showPhoto3 && !showPhoto4 && (
                                            <button type="button"
                                                    className="del_photo"
                                                    onClick={() => {
                                                        setShowPhoto3(false)
                                                        setValue("photo_4", ""); // Сброс значения поля
                                                    }}
                                            >убрать</button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {showPhoto4 && (
                                <label htmlFor="photo_5">Фото 5</label>
                            )}
                            {showPhoto4 && (
                                <div className="photo_item">
                                    <input {...register("photo_5")}
                                           id="photo_5"
                                           type="file"
                                           className="photo_input"
                                    />
                                    <div>
                                        {showPhoto4 && (
                                            <button type="button"
                                                    className="del_photo"
                                                    onClick={() => {
                                                        setShowPhoto4(false)
                                                        setValue("photo_5", ""); // Сброс значения поля
                                                    }}
                                            >убрать</button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {!showGroup7 && (
                                <MyButton onClick={() => {
                                    setShowGroup7(true);
                                    setTimeout(function() {
                                        ScrollToBottom()
                                    }, 200);
                                }}
                                >
                                    Далее
                                </MyButton>
                            )}
                        </div>
                    )}

                    {showGroup7 && (
                        <div className="form-characteristics">
                            <div className="form-subtitles">Видео из YouTube</div>

                            <label htmlFor="youtube">Ссылка на видео</label>
                            <input {...register("youtube")} id="youtube" type="url" />

                            {!showGroup8 && (
                                <MyButton onClick={() => {
                                    setShowGroup8(true);
                                    setTimeout(function() {
                                        ScrollToBottom()
                                    }, 200);
                                }}
                                >
                                    Далее
                                </MyButton>
                            )}
                        </div>
                    )}

                    {showGroup8 && (
                        <div className="form-characteristics">
                            <div className="form-subtitles">Описание и цена</div>

                            <label htmlFor="description">Описание</label>
                            <textarea {...register("description")} id="description" />

                            <label htmlFor="price">Цена</label>
                            <input {...register("price")} id="price" type="text" />

                            {!showGroup9 && (
                                <MyButton onClick={() => {
                                    setShowGroup9(true);
                                    setTimeout(function() {
                                        ScrollToBottom()
                                    }, 200);
                                }}
                                >
                                    Далее
                                </MyButton>
                            )}
                        </div>
                    )}

                    {showGroup9 && (
                        <div>
                            <div className="form-subtitles">Местонахождение и контакты продавца</div>

                            <DropdownStylishTwoForm categories={locations}
                                                    register={register}
                                                    setValue={setValue}
                                                    name="region"
                                                    subname="city"
                                                    title="Область"
                                                    subtitle="Город"
                            />

                            <div className="form-characteristics">
                                <label htmlFor="name">Имя продавца</label>
                                <input {...register("name")} id="name" type="text" />

                                <label htmlFor="phone_1">Номер телефона</label>
                                <div className="photo_item">
                                    <input {...register("phone_1")}
                                           id="phone_1"
                                           type="tel"
                                           maxLength="9"
                                           placeholder="293334455"/>
                                    <div>
                                        {!showPhone1 && (
                                            <button type="button"
                                                    className="add_photo"
                                                    onClick={() => {
                                                        setShowPhone1(true);
                                                        setTimeout(function () {
                                                            ScrollToBottom()
                                                        }, 200);
                                                    }}
                                            >+ добавить ещё</button>
                                        )}
                                    </div>
                                </div>

                                {showPhone1 && (
                                    <label htmlFor="phone_2">Номер телефона 2</label>
                                )}

                                {showPhone1 && (
                                    <div className="photo_item">
                                        <input {...register("phone_2")}
                                               id="phone_2"
                                               type="tel"
                                               maxLength="9"
                                               placeholder="293334455"
                                        />
                                        <div>
                                            {!showPhone2 && (
                                                <button type="button"
                                                        className="add_photo"
                                                        onClick={() => {
                                                            setShowPhone2(true);
                                                            setTimeout(function () {
                                                                ScrollToBottom()
                                                            }, 200);
                                                        }}
                                                >+ добавить ещё</button>
                                            )}
                                            {showPhone1 && !showPhone2 && (
                                                <button type="button"
                                                        className="del_photo"
                                                        onClick={() => {
                                                            setShowPhone1(false);
                                                            setValue("phone_2", ""); // Сброс значения поля "Номер телефона 2"
                                                        }}
                                                >убрать</button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {showPhone2 && (
                                    <label htmlFor="phone_3">Номер телефона 3</label>
                                )}
                                {showPhone2 && (
                                    <div className="photo_item">
                                        <input {...register("phone_3")}
                                               id="phone_3"
                                               type="tel"
                                               maxLength="9"
                                               placeholder="293334455"
                                        />
                                        <div>
                                            {showPhone2 && (
                                                <button type="button"
                                                        className="del_photo"
                                                        onClick={() => {
                                                            setShowPhone2(false);
                                                            setValue("phone_3", ""); // Сброс значения поля "Номер телефона 3"
                                                        }}
                                                >убрать</button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <MyButton type="submit">Подтвердить</MyButton>

                        </div>
                    )}
                </form>
            }
        </div>
    );
};

export default CarCreate;