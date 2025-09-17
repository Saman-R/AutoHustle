from docx import Document
from pdfminer.high_level import extract_text as extract_pdf_text
from fastapi import UploadFile
import os
import tempfile


async def parse_file(file: UploadFile) -> str:
    content = await file.read()
    filename = file.filename.lower()

    if not content:
        raise ValueError("JD file is empty!")

    if filename.endswith(".docx"):
        with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as tmp:
            tmp.write(content)
            temp_path = tmp.name

        doc = Document(temp_path)
        text = "\n".join(p.text for p in doc.paragraphs)
        if not text.strip():
            raise ValueError("DOCX file parsed but contains no readable text.")
        return text

    elif filename.endswith(".pdf"):
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(content)
            temp_path = tmp.name

        text = extract_pdf_text(temp_path)
        if not text.strip():
            raise ValueError("PDF parsed but contains no readable text.")
        return text

    else:
        raise ValueError("Unsupported JD file format (must be PDF or DOCX)")
