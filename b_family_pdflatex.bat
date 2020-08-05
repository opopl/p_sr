rem file _build_pdflatex_
 
@echo off 
 
set Bin=%~dp0
cd %Bin%
 
set proj=family
 
set tex_exe=pdflatex
 
set tex_opts=
 
set tex_opts=%tex_opts%  -file-line-error 
set tex_opts=%tex_opts%  -interaction nonstopmode 
set tex_opts=%tex_opts%  -output-directory=./builds/%proj%/b_pdflatex
 
set outdir=%Bin%\builds\%proj%\b_pdflatex
 
set outdir_pdf=%PDFOUT%\p_saintrussia
set outdir_pdf_b=%outdir_pdf%\b_pdflatex
 
md %outdir%
 
set bibfile=%projsdir%\%proj%.refs.bib
 
copy %bibfile% %outdir%
 
%tex_exe% %tex_opts% %proj%
rem --- bibtex makeindex --- 
cd %outdir% 
bibtex %proj%
makeindex %proj%
rem ------------------------ 
 
md %outdir_pdf%
md %outdir_pdf_b%
 
cd %Bin% 
%tex_exe% %tex_opts% %proj%
%tex_exe% %tex_opts% %proj%
 
copy %outdir%\%proj%.pdf %Bin%\pdf_built\b_%proj%.pdf
 
copy %outdir%\%proj%.pdf %outdir_pdf_b%\%proj%.pdf
 
copy %outdir%\%proj%.pdf %outdir_pdf%\%proj%.pdf
 
