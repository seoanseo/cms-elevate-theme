import os
import re
import sys

def camel_to_snake(name):
    s1 = re.sub(r'(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

def process_hubl_html_files(base_path):
    updated_files = []
    for root, _, files in os.walk(base_path):
        for file in files:
            if file.endswith('.hubl.html'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Find all camelCase paths and replace them with snake_case
                modified_content = re.sub(
                    r'(\.\./components/modules/)([A-Z][a-zA-Z0-9]+)',
                    lambda match: match.group(1) + camel_to_snake(match.group(2)),
                    content
                )

                if modified_content != content:
                    # Save the modified content back to the file
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(modified_content)
                    updated_files.append(file_path)
                    print(f'Processed: {file_path}')

    return updated_files

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <directory_path>")
        sys.exit(1)

    base_path = sys.argv[1]
    updated_files = process_hubl_html_files(base_path)
    print("Updated files:")
    for file in updated_files:
        print(file)
