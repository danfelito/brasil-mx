export const CONTACTO = {
  telefono: "229 464 8952",
  telefonoInternacional: "522294648952",
  correo: "contacto@brasilbusiness.shop",
  ubicacion: "Riviera Veracruzana, Alvarado, Veracruz. C.P. 95264",
} as const;

export const WHATSAPP_URL = `https://wa.me/${CONTACTO.telefonoInternacional}?text=${encodeURIComponent(
  "Hola, me interesa solicitar una cotización B2B de calzado de seguridad Spessoto y New Holland."
)}`;

export const EMAIL_URL = `mailto:${CONTACTO.correo}?subject=${encodeURIComponent(
  "Solicitud de cotización B2B"
)}`;
