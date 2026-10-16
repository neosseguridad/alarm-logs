
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export async function getServerSideProps() {
    const postlog_url = `${process.env.backend}/postlog`
    const res = await fetch(`${process.env.backend}/formdata`);

    if (!res.ok) {
        throw new Error("No se pudieron cargar los datos del formulario");
    }

    const data = await res.json();
    data.postlog_url = postlog_url;

    return {
        props: data,
    };
}

const binaryOptions = [
    { id: "true", value: true, label: "Sí" },
    { id: "false", value: false, label: "No" },
];

const inputClass =
    "w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 " +
    "text-sm text-stone-800 outline-none transition " +
    "placeholder:text-stone-400 focus:border-lime-500 focus:ring-2 " +
    "focus:ring-lime-500/20 dark:border-stone-600 dark:bg-stone-800 " +
    "dark:text-stone-100 dark:focus:border-lime-400";

const labelClass =
    "mb-1.5 block text-sm font-semibold text-stone-700 " +
    "dark:text-stone-300";

function FormSection({ number, title, description, children }) {
    return (
        <section className="overflow-hidden rounded-2xl border border-stone-200
            bg-white shadow-sm dark:border-stone-700 dark:bg-stone-900">

            <div className="flex items-start gap-4 border-b border-stone-200
                px-5 py-4 dark:border-stone-700 sm:px-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-xl bg-lime-100 text-sm font-bold text-lime-800
                    dark:bg-lime-900/40 dark:text-lime-300">
                    {number}
                </span>

                <div>
                    <h2 className="font-bold text-stone-900 dark:text-stone-100">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
                {children}
            </div>
        </section>
    );
}

function Field({ label, name, required = true, children }) {
    return (
        <div>
            <label htmlFor={name} className={labelClass}>
                {label}
                {required && (
                    <span className="ml-1 text-lime-700 dark:text-lime-400">
                        *
                    </span>
                )}
                {!required && (
                    <span className="ml-2 text-xs font-normal text-stone-400">
                        Opcional
                    </span>
                )}
            </label>
            {children}
        </div>
    );
}

function BinaryField({ name, value, onChange }) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
            {binaryOptions.map(option => {
                const selected = value === option.value;

                return (
                    <label
                        key={option.id}
                        className={`flex cursor-pointer items-center justify-center
                            gap-2 rounded-xl border px-4 py-3 text-sm font-semibold
                            transition ${
                                selected
                                    ? "border-lime-500 bg-lime-50 text-lime-900 ring-1 ring-lime-500/30 dark:border-lime-600 dark:bg-lime-950/40 dark:text-lime-300"
                                    : "border-stone-200 bg-white text-stone-600 hover:border-lime-300 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-lime-700"
                            }`}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={String(option.value)}
                            checked={selected}
                            required
                            onChange={() => onChange(option.value)}
                            className="accent-lime-600"
                        />
                        {option.label}
                    </label>
                );
            })}
        </div>
    );
}

export default function NewLog(props) {
    const [userAnswered, setUserAnswered] = useState(null);
    const [realEmergency, setRealEmergency] = useState(null);
    const [correctPassword, setCorrectPassword] = useState(null);
    const [correctPasswordLater, setCorrectPasswordLater] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;

        if (!form.reportValidity()) {
            return;
        }

        const formData = new FormData(form);
        const values = Object.fromEntries(formData.entries());

        const payload = {
            operator: values.operator,
            client: values.client,
            alarm_type: values.alarm_type,
            alarm_type_desc: values.alarm_type_desc || null,

            user_answered: userAnswered,

            ...(userAnswered === true && {
                user_name: values.user_name,
                real_emergency: realEmergency,

                ...(realEmergency === false && {
                    false_alarm_type: values.false_alarm_type,
                    false_alarm_type_desc:
                        values.false_alarm_type_desc || null,
                    correct_password: correctPassword,

                    ...(correctPassword === false && {
                        correct_password_later: correctPasswordLater,
                    }),
                }),
            }),
        };

        const res = await fetch(props.postlog_url, {
            body : JSON.stringify(payload),
            method : "post"
        }
        )
        const data = await res.json()
        window.location.href=`/logs/${data.log_id}`
    }

    return (
        <main className="min-h-screen bg-stone-50 px-4 py-8 dark:bg-stone-950
            sm:px-6 sm:py-12">

            <div className="mx-auto w-full max-w-3xl">

                {/* Header */}
                <header className="mb-8 flex flex-col items-center text-center">
                    <Link
                        href="/"
                        aria-label="Volver al inicio"
                        className="mb-5 rounded-xl p-2 transition
                            hover:bg-lime-100 dark:hover:bg-lime-900/30"
                    >
                        <Image
                            src="/logo.png"
                            alt="NEOS"
                            width={140}
                            height={70}
                            priority
                            className="block h-auto w-[120px] dark:hidden"
                        />
                        <Image
                            src="/logo-dark.png"
                            alt="NEOS"
                            width={140}
                            height={70}
                            priority
                            className="hidden h-auto w-[120px] dark:block"
                        />
                    </Link>

                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]
                        text-lime-700 dark:text-lime-400">
                        Centro de Control
                    </p>

                    <h1 className="text-3xl font-extrabold tracking-tight
                        text-stone-900 dark:text-stone-100 sm:text-4xl">
                        Registrar activación
                    </h1>

                    <p className="mt-3 max-w-lg text-sm leading-6
                        text-stone-500 dark:text-stone-400">
                        Completa la información de la atención de alarma.
                        Los campos marcados con <span className="font-bold text-lime-700">*</span>
                        {" "}son obligatorios.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Section 1 */}
                    <FormSection
                        number="01"
                        title="Información general"
                        description="Identifica al operador, cliente y tipo de alarma."
                    >
                        <Field label="Operador de turno" name="operator">
                            <select
                                id="operator"
                                name="operator"
                                className={inputClass}
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>
                                    Seleccionar operador
                                </option>
                                {props.operators.map(operator => (
                                    <option key={operator.id} value={operator.id}>
                                        {operator.name}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Cliente" name="client">
                            <select
                                id="client"
                                name="client"
                                className={inputClass}
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>
                                    Seleccionar cliente
                                </option>
                                {props.clients.map(client => (
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Tipo de alarma" name="alarm_type">
                            <select
                                id="alarm_type"
                                name="alarm_type"
                                className={inputClass}
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>
                                    Seleccionar tipo de alarma
                                </option>
                                {props.alarm_types.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        <Field
                            label="Descripción del tipo de alarma"
                            name="alarm_type_desc"
                            required={false}
                        >
                            <textarea
                                id="alarm_type_desc"
                                name="alarm_type_desc"
                                rows={3}
                                className={inputClass}
                                placeholder="Añadir detalles adicionales..."
                            />
                        </Field>
                    </FormSection>

                    {/* Section 2 */}
                    <FormSection
                        number="02"
                        title="Contacto con el usuario"
                        description="Registra si el usuario contestó la llamada."
                    >
                        <Field
                            label="¿El usuario contestó?"
                            name="user_answered"
                        >
                            <BinaryField
                                name="user_answered"
                                value={userAnswered}
                                onChange={setUserAnswered}
                            />
                        </Field>

                        {userAnswered === true && (
                            <div className="space-y-5 border-t border-stone-200
                                pt-5 dark:border-stone-700">
                                <Field
                                    label="Nombre del usuario que contestó"
                                    name="user_name"
                                >
                                    <input
                                        id="user_name"
                                        name="user_name"
                                        type="text"
                                        className={inputClass}
                                        placeholder="Nombre completo"
                                        required
                                    />
                                </Field>

                                <Field
                                    label="¿Es una emergencia real?"
                                    name="real_emergency"
                                >
                                    <BinaryField
                                        name="real_emergency"
                                        value={realEmergency}
                                        onChange={setRealEmergency}
                                    />
                                </Field>
                            </div>
                        )}
                    </FormSection>

                    {/* Section 3 */}
                    {userAnswered === true && realEmergency === false && (
                        <FormSection
                            number="03"
                            title="Evaluación de falsa alarma"
                            description="Documenta el motivo y verifica la consigna de seguridad."
                        >
                            <Field
                                label="Razón de falsa alarma"
                                name="false_alarm_type"
                            >
                                <select
                                    id="false_alarm_type"
                                    name="false_alarm_type"
                                    className={inputClass}
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>
                                        Seleccionar motivo
                                    </option>
                                    {props.false_alarm_types.map(type => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field
                                label="Descripción de falsa alarma"
                                name="false_alarm_type_desc"
                                required={false}
                            >
                                <textarea
                                    id="false_alarm_type_desc"
                                    name="false_alarm_type_desc"
                                    rows={3}
                                    className={inputClass}
                                    placeholder="Añadir detalles adicionales..."
                                />
                            </Field>

                            <div className="border-t border-stone-200 pt-5
                                dark:border-stone-700">
                                <Field
                                    label="¿El usuario brindó la consigna correcta?"
                                    name="correct_password"
                                >
                                    <BinaryField
                                        name="correct_password"
                                        value={correctPassword}
                                        onChange={setCorrectPassword}
                                    />
                                </Field>
                            </div>

                            {correctPassword === false && (
                                <div className="border-t border-stone-200 pt-5
                                    dark:border-stone-700">
                                    <Field
                                        label="Tras llamar a la policía, ¿el usuario brindó la consigna correcta?"
                                        name="correct_password_later"
                                    >
                                        <BinaryField
                                            name="correct_password_later"
                                            value={correctPasswordLater}
                                            onChange={setCorrectPasswordLater}
                                        />
                                    </Field>
                                </div>
                            )}
                        </FormSection>
                    )}

                    {/* Submission */}
                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row
                        sm:items-center sm:justify-between">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center
                                rounded-lg border border-stone-300 px-5 py-3
                                text-sm font-semibold text-stone-600 transition
                                hover:bg-stone-100 dark:border-stone-700
                                dark:text-stone-300 dark:hover:bg-stone-800"
                        >
                            Cancelar
                        </Link>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center
                                gap-2 rounded-lg bg-lime-600 px-6 py-3
                                text-sm font-bold text-white shadow-sm
                                transition hover:bg-lime-700 focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-lime-600
                                dark:bg-lime-600 dark:hover:bg-lime-500"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                                aria-hidden="true"
                            >
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
                                <path d="M17 21v-8H7v8" />
                                <path d="M7 3v5h8" />
                            </svg>
                            Guardar bitácora
                        </button>
                    </div>

                </form>

                <footer className="py-6 text-center text-xs text-stone-400">
                    NEOS · Bitácora de activaciones
                </footer>
            </div>
        </main>
    );
}
