"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { packages } from "@/data/packages";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    ubicacion: "",
    whatsapp: "",
    paquete: "standard", // Por defecto "Estándar"
    formacion: "",
    experiencia: "",
    objetivo: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // URL de tu Apps Script
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycby_-sAZecKEUeMHFmk8ee-YwmopCTAIiRrRcuVFAq7R-RMihDKewHPNW1vKqdcROrqOzw/exec";
  // Número de Abdia (Formato internacional sin +)
  const ABDIA_PHONE = "18496281004";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedPackage = packages.find((p) => p.id === formData.paquete);
      const packageName = selectedPackage
        ? selectedPackage.title
        : "Un Paquete";

      // 1. Enviar datos de texto a Google Sheets
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            plan: packageName,
          }),
        });
      }

      // 2. Construir mensaje de WhatsApp
      // Nota: No podemos adjuntar el archivo programáticamente a WhatsApp Web,
      // por lo que instruimos al usuario en el mensaje.
      let message = `Hola Abdia, he llenado el formulario para el *${packageName}*.\n\n`;
      message += `📄 *Mis Datos:*\n`;
      message += `Nombre: ${formData.nombre}\n`;
      message += `Objetivo: ${formData.objetivo.substring(0, 50)}...\n\n`; // Resumen corto

      if (file) {
        message += `📎 *Tengo mi CV (${file.name}) listo para enviártelo por aquí junto con el comprobante de pago.*\n`;
      } else {
        message += `📎 *Enviaré mi comprobante de pago por aquí.*\n`;
      }

      message += `\nQuedo a la espera de los datos bancarios.`;

      // Usamos api.whatsapp.com/send, que es el formato estándar para bots y negocios
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${ABDIA_PHONE}&text=${encodeURIComponent(
        message
      )}`;

      // 3. Redirigir
      window.location.href = whatsappUrl;
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error de conexión. Te redirigiremos a WhatsApp.");
      window.location.href = `https://wa.me/${ABDIA_PHONE}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.formCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>Formulario de Inicio</h2>
            <p className={styles.subtitle}>
              Completa la información requerida para que nuestro equipo empiece
              a trabajar en tu perfil.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.formGrid}>
            {/* Selección de Paquete (Ancho Completo) */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="paquete" className={styles.label}>
                Selecciona tu Plan
              </label>
              <select
                id="paquete"
                name="paquete"
                className={styles.select}
                value={formData.paquete}
                onChange={handleChange}
              >
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.title} - RD${pkg.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Datos Personales */}
            <div className={styles.formGroup}>
              <label htmlFor="nombre" className={styles.label}>
                Nombre Completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                className={styles.input}
                placeholder="Tu nombre y apellido"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="edad" className={styles.label}>
                Edad
              </label>
              <input
                type="text" // Text para flexibilidad
                id="edad"
                name="edad"
                required
                className={styles.input}
                placeholder="Ej. 28 años"
                value={formData.edad}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="whatsapp" className={styles.label}>
                WhatsApp
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                required
                className={styles.input}
                placeholder="809-000-0000"
                value={formData.whatsapp}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ubicacion" className={styles.label}>
                Ubicación
              </label>
              <input
                type="text"
                id="ubicacion"
                name="ubicacion"
                required
                className={styles.input}
                placeholder="Santo Domingo, DN"
                value={formData.ubicacion}
                onChange={handleChange}
              />
            </div>

            {/* Áreas de Texto (Ancho Completo) */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="objetivo" className={styles.label}>
                Objetivo Profesional
              </label>
              <textarea
                id="objetivo"
                name="objetivo"
                required
                className={styles.textarea}
                placeholder="¿A qué empresa o puesto deseas postularte? (Ej. Gerente de Ventas en Banca)"
                value={formData.objetivo}
                onChange={handleChange}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="formacion" className={styles.label}>
                Formación Académica
              </label>
              <textarea
                id="formacion"
                name="formacion"
                required
                className={styles.textarea}
                placeholder="Carreras, maestrías y cursos relevantes..."
                value={formData.formacion}
                onChange={handleChange}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="experiencia" className={styles.label}>
                Experiencia Laboral
              </label>
              <textarea
                id="experiencia"
                name="experiencia"
                required
                className={styles.textarea}
                placeholder="Últimos puestos con fechas de entrada y salida..."
                value={formData.experiencia}
                onChange={handleChange}
              />
            </div>

            {/* Input de Archivo (CV Anterior) */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>CV Anterior (Opcional)</label>
              <div className={styles.fileInputWrapper}>
                <label htmlFor="cv-upload" className={styles.fileInputLabel}>
                  <span style={{ fontSize: "1.5rem" }}>📎</span>
                  <span>
                    {file
                      ? "Archivo seleccionado"
                      : "Adjuntar CV actual (PDF/Word)"}
                  </span>
                </label>
                <input
                  type="file"
                  id="cv-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className={styles.hiddenInput}
                />
              </div>
              {file && <span className={styles.fileName}>{file.name}</span>}
            </div>

            {/* Botón de Envío */}
            <div className={styles.fullWidth}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Guardando datos..."
                  : "Confirmar Datos y Pagar en WhatsApp"}
              </button>

              <div className={styles.disclaimer}>
                <p>
                  <strong>Nota Importante:</strong> Al hacer clic, tus datos se
                  guardarán en nuestro sistema y serás redirigido a WhatsApp
                  para enviar el comprobante de pago y el archivo de tu CV
                  adjunto.
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
