import json
import subprocess
import sys
import os

# Test JSON data
test_data = {
    "roomImage": "test_room_base64",
    "productImage": "test_product_base64"
}

# Convert to JSON string
json_string = json.dumps(test_data)

# Call gpt.py with the JSON data
try:
    result = subprocess.run([
        'python', 'gpt.py', json_string
    ], capture_output=True, text=True)
    
    print("Exit code:", result.returncode)
    print("stdout:", result.stdout)
    print("stderr:", result.stderr)
    
    if result.returncode == 0:
        # Parse the response
        response = json.loads(result.stdout)
        print("Response:", response)
        
except Exception as e:
    print("Error:", e) 