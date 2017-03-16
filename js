.$("#targetFile").change(function(){  
            var filename = $(this).val();  
            $("#originalTargetFileName").val(filename);  
        });  
          
        $("#targetUpload").submit(function(){  
            $.ajaxFileUpload({  
                type: "post",  
                url: "${pageContext.request.contextPath}/upload.do",  
                secureuri:false,  
                fileElementId:"targetFile",  
                dataType: "json",  
                success: function(result,status) {  
                    if (result.success == "1") {  
                        alert("上传文件成功！");  
                        var filename=getFileNameFromFilePath(result.fileRelativePath);  
                        $("#target_upload_info").html("<div>"+"文件:"+filename+"   <a href='javascript:void(0)' onclick='deletefile("+"\""+result.fileRelativePath+"\",\"target\")'>删除</a>"+"<br/></div>");  
                        $("#target_upload_info").css("visibility", "visible");  
                        $("#targetFileRelativePath").val(result.fileRelativePath);  
                    } else {  
                        $("#target_upload_info").html("文件上传失败: " + result.msg);  
                        $("#target_upload_info").css({"visibility":"visible", "color":"red"});  
                    }  
                },  
                complete: function(xmlHttpRequest) {  
                    $("#targetFile").replaceWith('<input type="file" id="targetFile" name="upFile" style="display:none;"/>');  
                    $("#targetFile").on("change", function(){  
                        var filename = $(this).val();  
                        $("#originalTargetFileName").val(filename);  
                    });  
                },  
                error: function(data, status, e) {  
                    alert("文件上传失败!");  
                }  
            });  
            return false;  
        }); 

